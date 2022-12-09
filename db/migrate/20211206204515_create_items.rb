class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :name
      t.float :price
      t.boolean :completed
      t.references :tab
      t.references :user
      t.timestamps
    end
  end
end
