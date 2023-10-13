class User < ApplicationRecord
     validates :email, uniqueness: true
     has_secure_password
     has_one_attached :image
end
