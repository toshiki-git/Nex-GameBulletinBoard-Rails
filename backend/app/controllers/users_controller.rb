class UsersController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy, :upload_image]
    skip_before_action :authenticate_request, only: [:create]
  
    def index
      @users = User.all.map do |user|
        user_attributes(user)
      end
      render json: @users
    end
  
    def show
      render json: user_attributes(@user)
    end
  
    def create
      @user = User.new(user_params)
      @user.image.attach(params[:user][:image])
      if @user.save
        token = JwtService.encode({ user_id: @user.id })
        render json: { user: @user, token: token }, status: :created
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
  
    def update
      if @user.update(user_params)
        render json: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @user.destroy
      render json: { message: 'User deleted successfully' }
    end
  
    def me
      token = cookies.signed[:user_token]
      return render json: { error: 'Token is missing' }, status: :unauthorized unless token
  
      decoded_payload = JwtService.decode(token)
      return render json: { error: 'Invalid token' }, status: :unauthorized unless decoded_payload
  
      user_id = decoded_payload['user_id']
      @user = User.find_by(id: user_id)
      if @user
        render json: @user
      else
        render json: { error: 'User not found' }, status: :not_found
      end
    end
  
    def upload_image
      if @user.update(user_params)
        render json: { message: 'Image uploaded successfully' }
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
  
    def current
      render json: @current_user
    end
  
    private
  
    def set_user
      @user = User.find(params[:id])
    end
  
    def user_attributes(user)
      if user.image.attached?
        user.as_json.merge(image_url: rails_blob_url(user.image))
      else
        user.as_json
      end
    end
  
    def user_params
      params.require(:user).permit(:username, :email, :password, :password_confirmation, :image)
    end
  end
  