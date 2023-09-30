Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "user#index" # ここでは、homeコントローラのindexアクションをルートパスに指定しています。

  # CRUD operations for users
  resources :users

  # 例: 特定のコントローラアクションだけをルーティングしたい場合
  # resources :users, only: [:index, :show, :create, :update, :destroy]

  # 例: 特定のコントローラアクションを除外してルーティングしたい場合
  # resources :users, except: [:edit, :new]
end
