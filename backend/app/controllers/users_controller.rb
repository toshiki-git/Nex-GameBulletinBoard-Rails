class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy, :upload_image]
  skip_before_action :authenticate_request, only: [:create]

  #最終的には消去
  def index
    users = User.all.map { |user| user_attributes(user) }
    render json: users, status: :ok
  end
  
  def show
    render json: user_attributes(@user), status: :ok
  end
  
  def create
    @user = User.new(user_params)
    attach_user_image
    if @user.save
      render_on_create_success
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end
  
  def update
    if current_user.email == 'test@example.com'
      render json: { error: 'testユーザーにはユーザ名変更権限がありません' }, status: :forbidden
    else
      @user.assign_attributes(user_params)
      attach_user_image
      if @user.save
        render json: user_attributes(@user), status: :ok
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
  end
  
  def destroy
    @user.destroy
    render json: { message: 'User deleted successfully' }, status: :ok
  end
  
  def me
    render json: user_attributes(current_user), status: :ok
  end
  
  def upload_image
    if current_user.email == 'test@example.com'
      render json: { error: 'testユーザーにはアイコン変更権限がありません' }, status: :forbidden
    else
      @user.image.attach(user_params[:image])
      if @user.save
        render json: { message: 'Image uploaded successfully' }, status: :ok
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
  end

  private
  
  def set_user
    @user = User.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
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
  
  def attach_user_image
    return unless params.dig(:user, :image)

    @user.image.attach(params[:user][:image])
  end
  
  def render_on_create_success
    token = JwtService.encode({ user_id: @user.id })
    render json: { user: user_attributes(@user), token: token }, status: :created
  end
end
