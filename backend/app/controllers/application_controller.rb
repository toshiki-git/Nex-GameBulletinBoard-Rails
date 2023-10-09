class ApplicationController < ActionController::API
    include ActionController::Cookies

    before_action :authenticate_request
  
    private
  
    def authenticate_request
      token = cookies.signed[:user_token]
      decoded_token = JwtService.decode(token)
    
      if decoded_token
        user_id = decoded_token["user_id"]
        @current_user = User.find_by(id: user_id)
      end
    
      unless @current_user
        render json: { error: "Unauthorized" }, status: :unauthorized
      end
    end
  end
  