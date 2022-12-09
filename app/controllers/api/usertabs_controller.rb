class Api::UsertabsController < ApplicationController

    def index
        usertabs = Usertab.all
        render json: usertabs
    end
    
    def create 
        usertab = Usertab.create(usertab_params)
        if usertab.valid?
            session[:usertab_id] = usertab.id
            render json: usertab, status: :created 
        else 
            render json: { errors: usertab.errors.full_messages }, status: :unprocessable_entity 
        end 
    end

    private 

    def usertab_params 
        params.permit(:user_id, :tab_id)
    end

end
