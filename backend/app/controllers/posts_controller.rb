class PostsController < ApplicationController

    def index
        posts_per_page = 10
        posts = Post.order(created_at: :desc).page(params[:page]).per(posts_per_page)
        total_posts = Post.count
        render json: {
            total_posts: total_posts,
            posts: posts.map { |post| post_attributes(post) }
        }
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
        posts_per_page = 10
    
        if query.present?
            all_posts = Post.where('content LIKE ? OR hashtags LIKE ?', "%#{query}%", "%#{query}%").order(created_at: :desc)
            paginated_posts = all_posts.page(params[:page]).per(posts_per_page)
    
            render json: {
                total_posts: all_posts.count,
                posts: paginated_posts.map { |post| post_attributes(post) }
            }
        end
    end
    
    
    

    def my_posts
        id = current_user.id
        posts_per_page = 10
        my_posts = Post.where(user_id: id).order(created_at: :desc)
        paginated_posts = my_posts.page(params[:page]).per(posts_per_page)
        render json: {
                total_posts: my_posts.count,
                posts: paginated_posts.map { |post| post_attributes(post) }
            }
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
