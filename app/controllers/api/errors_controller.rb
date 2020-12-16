class Api::ErrorsController < ApplicationController
    protect_from_forgery with: :null_session #disable auth token

    def create
        ErrorMailer.bug_report(params[:subject], params[:body]).deliver_now
        render json: {success: true}
    end
end