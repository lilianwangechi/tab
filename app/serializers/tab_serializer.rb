class TabSerializer < ActiveModel::Serializer
  attributes :id, :name, :completed
  has_many :items
  has_many :users
end
