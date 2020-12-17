class AddColumnsToReviews < ActiveRecord::Migration[5.2]
  def change
    add_column :reviews, :avg_tips, :float
    add_column :reviews, :satisfaction, :string
  end
end
