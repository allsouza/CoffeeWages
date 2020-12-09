class Api::ReviewsController < ApplicationController
    def show
        @review = Review.find(params[:id])
    end

    def index
        @reviews = Review.all
    end

    def create
        @review = Review.new(review_params)
        if @review.save
            render :show
        else
            render json: @review.errors.full_messages
        end
    end
    
    private
    def review_params
        params.require(:review).permit(
            :business_id, :position, :start_date, :end_date, :employment_type, 
            :wage, :tips, :gender, :orientation, :race, :notes
        )
    end
end
