require 'json'

class Api::ArrangementsController < ApplicationController

    def index
        @arrangements = Arrangement.all
    end

    
    def show
        @arrangement = Arrangement.find(params[:id])
    end


    def create
        @arrangement = Arrangement.new(arrangement_params)
        if @arrangement.save
            debugger
            render :show
        else
            render json: @arrangement.errors.full_messages, status: 401
        end
    end


    def update

    end


    def destroy

    end

    private

    def arrangement_params
        debugger
        params.require(:arrangement).permit(:name, :board)
    end


end
