Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "user#index"

  post 'auth/login', to: 'auth#login'
  delete 'auth/logout', to: 'auth#logout'
  
  # Place this above the resources :users line
  get '/users/me', to: 'users#me'

  # CRUD operations
  resources :users do
    member do
      post :"upload_image"
    end
  end
  resources :posts do
    collection do
      get :search
      get :my_posts
    end
  end

  # 例: 特定のコントローラアクションだけをルーティングしたい場合
  # resources :users, only: [:index, :show, :create, :update, :destroy]

  # 例: 特定のコントローラアクションを除外してルーティングしたい場合
  # resources :users, except: [:edit, :new]
end
