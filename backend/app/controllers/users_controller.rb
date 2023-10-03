class UsersController < ApplicationController
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
          token = encode_token({ user_id: @user.id })
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

    private

    # Strong Parametersを使用して、許可されたパラメータのみを使用します
    def user_params
        params.require(:user).permit(:username, :email, :password, :password_confirmation)
    end

    def encode_token(payload)
        # JWTのエンコード処理。ここでは 'my_secret_key' と 'HS256' アルゴリズムを使用していますが、
        # これは例であり、実際の実装では適切なシークレットキーやアルゴリズムを選択してください。
        JWT.encode(payload, 'my_secret_key', 'HS256')
    end
end

