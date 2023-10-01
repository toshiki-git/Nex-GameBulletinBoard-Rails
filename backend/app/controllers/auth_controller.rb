class AuthController < ApplicationController
    def login
      user = User.find_by(email: params[:email])
  
      if user&.authenticate(params[:password])
        token = JwtService.encode(user_id: user.id)
        render json: { token: token }
      else
        render json: { error: 'Invalid credentials' }, status: :unauthorized
      end
    end
  end
  