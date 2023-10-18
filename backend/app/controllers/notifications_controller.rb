class NotificationsController < ApplicationController
  
  def index
    @notifications = current_user.notifications.includes(:actor, :notifiable).order(created_at: :desc)

    render json: @notifications.map { |notification|
      notification.as_json(include: {
        actor: { 
          only: [:id],
          methods: [:image_url]  # 'image_url'メソッドを結果に含める
        }
      }).merge({
        post_id: notification.notifiable.respond_to?(:post_id) ? notification.notifiable.post_id : nil,
        content: notification.notifiable.respond_to?(:content) ? notification.notifiable.content : nil
      })
    }
  end
  
    def update
      # 通知を既読にする
      @notification = current_user.notifications.find(params[:id])
      @notification.update(read_at: Time.zone.now) # 既読のタイムスタンプを設定
      render json: { success: true }
    end
  end
  