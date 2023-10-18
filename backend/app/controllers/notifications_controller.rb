class NotificationsController < ApplicationController
  
  def index
    @notifications = current_user.notifications.includes(:actor, :notifiable).order(created_at: :desc)

    render json: @notifications.as_json(include: {
      actor: { 
        only: [:id],
        methods: [:image_url]  # 'image_url'メソッドを結果に含める
      },
      notifiable: {
        only: [:content]  # ここでコメントのテキスト内容のみを指定します。
      }
    })
  end
  
    def update
      # 通知を既読にする
      @notification = current_user.notifications.find(params[:id])
      @notification.update(read_at: Time.zone.now) # 既読のタイムスタンプを設定
      render json: { success: true }
    end
  end
  