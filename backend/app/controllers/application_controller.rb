class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authenticate_request

  private

  def authenticate_request
    token = request.headers['Authorization']&.split(' ')&.last
    decoded_token = JwtService.decode(token) rescue nil
  
    if decoded_token
      user_id = decoded_token["user_id"]
      @current_user = User.find_by(id: user_id)
    end
  
    unless @current_user
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end
end

