class AddNotesToReviews < ActiveRecord::Migration[5.2]
  def change
    add_column :reviews, :notes, :text
  end
end
