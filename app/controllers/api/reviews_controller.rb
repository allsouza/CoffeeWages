class Api::ReviewsController < ApplicationController
    
    
    private
    def review_params
        params.require(:review).permit(
            :position, :start_date, :end_date, :employment_type, 
            :wage, :tips, :gender, :orientation, :race
        )
    end
end
