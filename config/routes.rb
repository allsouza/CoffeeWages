# == Route Map
#
#                    Prefix Verb  URI Pattern                                                                              Controller#Action
#                      root GET   /                                                                                        static_pages#root
#                 api_users POST  /api/users(.:format)                                                                     api/users#create {:default=>{:format=>:json}}
#      api_business_reviews GET   /api/businesses/:business_id/reviews(.:format)                                           api/reviews#index {:default=>{:format=>:json}}
#            api_businesses GET   /api/businesses(.:format)                                                                api/businesses#index {:default=>{:format=>:json}}
#                           POST  /api/businesses(.:format)                                                                api/businesses#create {:default=>{:format=>:json}}
#              api_business GET   /api/businesses/:id(.:format)                                                            api/businesses#show {:default=>{:format=>:json}}
#               api_reviews GET   /api/reviews(.:format)                                                                   api/reviews#index {:default=>{:format=>:json}}
#                           POST  /api/reviews(.:format)                                                                   api/reviews#create {:default=>{:format=>:json}}
#                api_review GET   /api/reviews/:id(.:format)                                                               api/reviews#show {:default=>{:format=>:json}}
#                           PATCH /api/reviews/:id(.:format)                                                               api/reviews#update {:default=>{:format=>:json}}
#                           PUT   /api/reviews/:id(.:format)                                                               api/reviews#update {:default=>{:format=>:json}}
#                api_errors POST  /api/errors(.:format)                                                                    api/errors#create {:default=>{:format=>:json}}
#                api_search GET   /api/search(.:format)                                                                    api/businesses#search {:default=>{:format=>:json}}
#       api_search_location GET   /api/search_location(.:format)                                                           api/businesses#search_location {:default=>{:format=>:json}}
#        rails_service_blob GET   /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
# rails_blob_representation GET   /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
#        rails_disk_service GET   /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
# update_rails_disk_service PUT   /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
#      rails_direct_uploads POST  /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"
  namespace :api, default:{format: :json} do
    resources :users, only: %i(create)
    resources :businesses, only: [:create, :show, :index] do
      resources :reviews, only: [:index]
    end
    resources :reviews, only: [:index, :create, :show, :update, :delete]
    resource :errors, only: [:create]
    get '/search', to: 'businesses#search'
    get '/search_location', to: 'businesses#search_location'
  end
end
