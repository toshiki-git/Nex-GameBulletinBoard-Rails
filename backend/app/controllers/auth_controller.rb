class AuthController < ApplicationController
  skip_before_action :authenticate_request, only: [:login]
  
  def login
    user = User.find_by(email: params[:email])
  
    if user&.authenticate(params[:password])
      token = JwtService.encode(user_id: user.id)
      #cookies.signed[:user_token] = { value: token, httponly: true, secure: Rails.env.production? }
      render json: { token: token }
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end

  def logout
    cookies.delete(:user_token)
    render json: { status: 'logged out' }, status: :ok
  end
end

  