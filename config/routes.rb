Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"
  namespace :api, default:{format: :json} do
    resources :businesses, only: [:create, :show, :index] do
      resources :reviews, only: [:index]
    end
    resources :reviews, only: [:index, :create, :show, :update, :delete]
    get '/search', to: 'businesses#search'
  end
end
