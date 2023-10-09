class UsersController < ApplicationController
    skip_before_action :authenticate_request, only: [:create]

    def index
        @users = User.all
        render json: @users
    end

    def show
        @user = User.find params[:id]
        render json: @user
    end

    def create
        @user = User.new(user_params)
        
        if @user.save
          token = JwtService.encode({ user_id: @user.id })
          render json: { user: @user, token: token }, status: :created
        else
          render json: @user.errors, status: :unprocessable_entity
        end
    end
     
    def update
        @user = User.find params[:id]
        @user.update user_params
        render json: @user
    end

    def destroy
        @user = User.find params[:id]
        @user.destroy
        render json: @user
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

    def current
        render json: @current_user
    end

    private

    def user_params
        params.require(:user).permit(:username, :email, :password, :password_confirmation)
    end
end

