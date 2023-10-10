class PostsController < ApplicationController
    def index
        posts = Post.all.map do |post|
            if post.image.attached?
                post.as_json.merge(image_url: rails_blob_url(post.image))
            else
                post.as_json
            end
        end
        render json: posts
    end

    def show
        post = Post.find params[:id]
        if post.image.attached?
            render json: post.as_json.merge(image_url: rails_blob_url(post.image))
        else
            render json: post
        end
    end

    def create
        post = Post.new(post_params)
        post.image.attach(params[:post][:image])
        if post.save
            render json: post
        else
            render json: post.errors, status: :unprocessable_entity
        end
    end

    def update
        post = Post.find params[:id]
        post.update post_params
        render json: post
    end

    def destroy
        post = Post.find params[:id]
        post.destroy
        render json: post
    end

    private
    def post_params
        params.require(:post).permit(:user_id, :content, :hashtags, :image)
    end
end
