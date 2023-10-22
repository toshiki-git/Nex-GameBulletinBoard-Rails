Rails.application.routes.draw do
  root "users#me"

  post 'auth/login', to: 'auth#login'
  delete 'auth/logout', to: 'auth#logout'
  
  get '/users/me', to: 'users#me'

  resources :users do
    member do
      post :"upload_image"
    end
  end

  resources :posts do
    resources :comments, only: [:create]

    collection do
      get :search
      get :my_posts
    end
  end

  resources :notifications, only: [:index, :update]

  get '/posts/:id/comments', to: 'comments#comments'
  get '/user_posts/:user_id', to: 'posts#user_posts'
  delete '/notifications/:id', to: 'notifications#destroy'
end
