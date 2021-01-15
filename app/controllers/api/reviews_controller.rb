class Api::ReviewsController < ApplicationController
    def show
        @review = Review.find(params[:id])
    end

    def index
        name = params.dig(:filters, :name) || nil
        location = params.dig(:filters,:location) || nil

        if name && location
            reviews = Review.joins(:business).where('lower(businesses.name) ILIKE ?', "%#{name}%").where('lower(businesses.location) ILIKE ?', "%#{location}%")
        elsif name
            reviews = Review.joins(:business).where('lower(businesses.name) ILIKE ?', "%#{name}%")
        elsif location
            reviews = Review.joins(:business).where('lower(businesses.location) ILIKE ?', "%#{location}%")
        else
            reviews = Review.all.includes(:business)
        end
        
        @reviews = reviews
    end

    def create
        @review = Review.new(review_params)
        if @review.save
            render :show
        else
            render json: @review.errors.full_messages
        end
    end

    def destroy
        @review = Review.find(params[:id])
        @review.destroy
    end
    
    private
    def review_params
        params.require(:review).permit(
            :position, :start_date, :end_date, :employment_type, 
            :wage, :tips, :gender, :orientation, :race, :pay_frequency,
            :business_id, :notes, :satisfaction, :avg_tips
        )
    end
end
