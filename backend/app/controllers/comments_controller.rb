class CommentsController < ApplicationController
  
  def create
    if current_user.email == 'test@example.com'
      render json: { error: 'testユーザーにはコメント投稿権限がありません' }, status: :forbidden
    else
      @post = Post.find(params[:post_id])
      @comment = @post.comments.new(comment_params.merge(user_id: current_user.id))
  
      if @comment.save
        create_notification(@post, @comment)
        render json: @comment, status: :created
      else
        render json: @comment.errors, status: :unprocessable_entity
      end
    end
  end

    def comments
      post = Post.find(params[:id])
      comments = post.comments.includes(:user).order(created_at: :desc)
  
      render json: comments.as_json(include: {
        user: {
          only: [:id, :username, :email],
          methods: [:image_url]
        }
      })
    end
  
    private
  
    def comment_params
      params.require(:comment).permit(:content)
    end

    def create_notification(post, comment)
      return if post.user_id == current_user.id
    
      notification = Notification.new(
        recipient_id: post.user_id,
        actor_id: current_user.id,
        action: 'posted',
        notifiable: comment
      )
    
      unless notification.save
        logger.error notification.errors.full_messages.to_sentence
      end
    end
    
    
  end
  