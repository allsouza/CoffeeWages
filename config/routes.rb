Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"
  namespace :api, default:{format: :json} do
    resources :businesses, only: [:create, :show, :index]
    get '/search', to: 'businesses#search'
    resources :reviews, only: [:create, :show, :index]
  end
end
