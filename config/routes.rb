Rails.application.routes.draw do
  
  namespace :api do
    resources :usertabs, only: [:index,:create]
    resources :tabs, only: [:index, :show, :create, :update, :destroy]
    resources :items, only: [:index, :show, :create, :update, :destroy]
    resources :users, only: [:index, :create, :destroy]
    # Routing logic: fallback requests for React Router.
    # Leave this here to help deploy your app later!
    get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

    post '/login', to: "sessions#create"
    delete '/logout', to: "sessions#destroy"
    post '/signup', to: "users#create"
    get "/me", to: "users#show"
  end

end
