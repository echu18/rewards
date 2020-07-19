require 'json'

class Api::ArrangementsController < ApplicationController

    def index
        @arrangements = Arrangement.all
    end

    
    def show
        @arrangement = Arrangement.find(params[:id])
        render :show
    end


    def create
        # @arrangement = Arrangement.new({name: arrangement_params[:name], board: JSON.parse(arrangement_params[:board])})
        
        @arrangement = Arrangement.new(arrangement_params)
        
        
        if @arrangement.save
            render :show
        else
            render json: @arrangement.errors.full_messages, status: 401
        end
    end


    def update
        debugger
        @arrangement = Arrangement.find_by(id: params[:id])

        if @arrangement && @arrangement.update_attributes(arrangement_params)
            render :show
        elsif !@arrangement
            render json: ['Could not find arrangement'], status: 400
        else
            render json: @arrangement.errors.full_messages, status: 401
        end
    end


    def destroy
        @arrangement = Arrangement.find(params[:id])

        if @arrangement
            @arrangement.destroy
            render :show
        else
            render ['Could not find arrangement']
        end
    end

    private

    def arrangement_params
        params.require(:arrangement).permit(:name, :r0, :r1, :r2, :r3, :r4)
    end


end
