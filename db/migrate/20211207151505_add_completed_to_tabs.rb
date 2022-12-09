class AddCompletedToTabs < ActiveRecord::Migration[6.1]
  def change
    add_column :tabs, :completed, :boolean
  end
end
