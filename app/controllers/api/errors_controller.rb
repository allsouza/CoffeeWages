class Api::ErrorsController < ApplicationController
    protect_from_forgery with: :null_session #disable auth token

    def create
        debugger
        response = ErrorMailer.bug_report(params[:subject], params[:body])
        render json: response.status_code
    end
end