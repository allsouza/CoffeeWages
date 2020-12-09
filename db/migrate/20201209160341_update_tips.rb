class UpdateTips < ActiveRecord::Migration[5.2]
  def change
    remove_column :reviews, :tips
    add_column :reviews, :tips, :boolean
  end
end
