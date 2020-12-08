class RemoveNullFromBusinesses < ActiveRecord::Migration[5.2]
  def change
    change_column_null :businesses, :address, true
    change_column_null :businesses, :coordinates, true
  end
end
