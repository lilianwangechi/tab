class CreateUsertabs < ActiveRecord::Migration[6.1]
  def change
    create_table :usertabs do |t|
      t.references :user
      t.references :tab

      t.timestamps
    end
  end
end
