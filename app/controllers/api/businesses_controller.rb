class Api::BusinessesController < ApplicationController
    def show
        @business = Business.find(params[:id])
    end

    def index
        @businesses = Business.all
    end

    def search
        render json: Business.searchApi(params[:terms])
    end

    def search_location
        result = Business.where("location LIKE '%#{params[:location]}%' AND name LIKE '%#{params[:name]}%'").includes(:reviews)
        @reviews = []
        result.map {|ele| @reviews.concat(ele.reviews)}
        render json: @reviews
    end

    def create
        @business = Business.new(business_params)
        if @business.save
            render :show
        else
            render json: @business.errors.full_messages, status: 422
        end
    end

    private
    def business_params
        params.require(:business).permit(:name, :address, :coordinates, :location)
    end
end
