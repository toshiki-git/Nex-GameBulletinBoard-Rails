Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "user#index"

  post 'auth/login', to: 'auth#login'
  
  # Place this above the resources :users line
  get '/users/me', to: 'users#me'

  # CRUD operations
  resources :users
  resources :posts

  # 例: 特定のコントローラアクションだけをルーティングしたい場合
  # resources :users, only: [:index, :show, :create, :update, :destroy]

  # 例: 特定のコントローラアクションを除外してルーティングしたい場合
  # resources :users, except: [:edit, :new]
end
