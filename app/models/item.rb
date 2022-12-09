class Item < ApplicationRecord
    belongs_to :tab
    belongs_to :user
end
