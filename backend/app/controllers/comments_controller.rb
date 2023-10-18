class CommentsController < ApplicationController
  
  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.create(comment_params.merge(user_id: current_user.id))

    if @comment.save
      # 通知を作成します。これは、ポストのオーナーに通知します。
      create_notification(@post, @comment)

      render json: @comment, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

    def comments
      post = Post.find(params[:id])
      comments = post.comments.includes(:user).order(created_at: :desc)
  
      render json: comments.as_json(include: {
        user: {
          only: [:id, :username, :email],
          methods: [:image_url]  # 'image_url'メソッドを結果に含める
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
        # もしくは
        # puts notification.errors.full_messages.to_sentence
      end
    end
    
    
  end
  