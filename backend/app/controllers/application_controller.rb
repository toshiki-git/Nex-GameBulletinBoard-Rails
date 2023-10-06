class ApplicationController < ActionController::API
    include ActionController::Cookies

    before_action :authenticate_request
  
    private
  
    def authenticate_request
      token = request.headers['Authorization']&.split(' ')&.last
      decoded_token = JwtService.decode(token)
      
      if decoded_token
        @current_user = User.find(decoded_token["user_id"])
      else
        render json: { error: 'Not Authorized' }, status: :unauthorized
      end
    end
  end
  