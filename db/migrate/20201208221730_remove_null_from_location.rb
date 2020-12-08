class RemoveNullFromLocation < ActiveRecord::Migration[5.2]
  def change
    change_column_null :businesses, :location, true
  end
end
