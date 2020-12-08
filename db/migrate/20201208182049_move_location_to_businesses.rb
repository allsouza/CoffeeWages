class MoveLocationToBusinesses < ActiveRecord::Migration[5.2]
  def change
    remove_column :reviews, :location
    add_column :businesses, :location, :string, null:false
  end
end
