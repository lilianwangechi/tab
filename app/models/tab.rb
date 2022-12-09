class Tab < ApplicationRecord
    has_many :items, dependent: :destroy
    has_many :usertabs, dependent: :destroy
    has_many :users, through: :usertabs

end
