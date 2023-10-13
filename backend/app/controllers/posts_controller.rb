class PostsController < ApplicationController

    def index
        posts = Post.all.map { |post| post_attributes(post) }
        render json: posts
    end

    def show
        post = Post.find params[:id]
        render json: post_attributes(post)
    end

    def create
        post = Post.new(post_params)
        post.image.attach(params[:post][:image]) if params[:post][:image].present?
        if post.save
            render json: post_attributes(post), status: :created
        else
            render json: post.errors, status: :unprocessable_entity
        end
    end

    def update
        post = Post.find params[:id]
        post.update(post_params)
        render json: post_attributes(post)
    end

    def destroy
        post = Post.find params[:id]
        post.destroy
        render json: post
    end

    def search
        query = params[:query]
        posts = if query.present?
                  Post.where('content LIKE ? OR hashtags LIKE ?', "%#{query}%", "%#{query}%")
                else
                  Post.all
                end
      
        render json: posts.map { |post| post_attributes(post) }
    end

    def my_posts
        id = current_user.id
        posts = Post.where(user_id: id)
        render json: posts.map { |post| post_attributes(post) }
    end
    
    private
    
    def post_params
        params.require(:post).permit(:user_id, :content, :hashtags, :image)
    end

    def post_attributes(post)
        if post.image.attached?
            post.as_json.merge(image_url: rails_blob_url(post.image))
        else
            post.as_json
        end
    end
end
