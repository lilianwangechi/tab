class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :completed, :tab_id, :user_id
end
