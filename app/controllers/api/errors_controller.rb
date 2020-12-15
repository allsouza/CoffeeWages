class Api::ErrorsController < ApplicationController
    protect_from_forgery with: :null_session #disable auth token
    
    def create
        Error.send_email(params[:subject], params[:body])
        render json: {success: true}
    end
end