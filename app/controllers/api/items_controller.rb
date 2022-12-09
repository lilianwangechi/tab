class Api::ItemsController < ApplicationController

    def index
        items = current_user.items
        render json: items
    end

    def show 
        item = Item.find(params[:id])
        render json: item
    end

    def create 
        item = Item.create(item_params)
        if item.valid?
            render json: item, status: :created 
        else 
            render json: item.errors.full_messages, status: :unprocessable_entity 
        end 
    end

    def destroy 
        item = Item.find_by(id: params[:id])
        if item 
            item.destroy
            head :no_content 
        else  
            render json: "Item does not exist", status: :not_found 
        end
    end

    private 

    def item_params 
        params.permit(:name,:price,:user_id, :tab_id)
    end

end
