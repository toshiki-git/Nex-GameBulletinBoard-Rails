class CommentsController < ApplicationController
  
    def create
      @post = Post.find(params[:post_id])
      @comment = @post.comments.create(comment_params.merge(user_id: current_user.id))
  
      if @comment.save
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
    
  end
  