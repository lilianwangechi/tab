class Usertab < ApplicationRecord
    belongs_to :tab
    belongs_to :user
end
