class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        @user.admin = User.is_admin?(params[:user][:admin_secret])
        if @user.save
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    private
    def user_params
        params.require(:user).permit(:username, :email, :password, :first_name, :last_name)
    end
end