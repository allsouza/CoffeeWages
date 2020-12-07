Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :businesses, only: [:create, :show]
    resources :reviews, only: [:create, :show, :update, :destroy]
  end
end
