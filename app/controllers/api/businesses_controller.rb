class Api::BusinessesController < ApplicationController


    private
    def business_params
        params.require(:business).permit(:name, :address, :coordinates)
    end
end
