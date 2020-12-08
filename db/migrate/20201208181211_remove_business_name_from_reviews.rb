class RemoveBusinessNameFromReviews < ActiveRecord::Migration[5.2]
  def change
    remove_column :reviews, :business_name
  end
end
