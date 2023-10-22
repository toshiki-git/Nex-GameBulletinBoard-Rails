class NotificationsController < ApplicationController
  def index
    @notifications = current_user.notifications.includes(:actor, :notifiable).order(created_at: :desc)

    render json: @notifications.map { |notification|
      additional_attributes = {
        post_id: notification.notifiable.respond_to?(:post_id) ? notification.notifiable.post_id : nil,
        content: notification.notifiable.respond_to?(:content) ? notification.notifiable.content : nil
      }

      notification.as_json(include: {
        actor: {
          only: [:id],
          methods: [:image_url]
        }
      }).merge(additional_attributes)
    }
  end

  def destroy
    notification = current_user.notifications.find(params[:id])

    if notification.destroy
      render json: { success: true }
    else
      render json: { success: false }, status: :unprocessable_entity
    end
  end
end

  