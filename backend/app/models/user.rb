class User < ApplicationRecord
  validates :email, uniqueness: true
  has_secure_password
  has_one_attached :image
  has_many :notifications, foreign_key: :recipient_id

  def image_url
    if self.image.attached?
      Rails.application.routes.url_helpers.rails_blob_url(self.image, only_path: false)
    end
  end
end
