class RemoveNullFromBusinessId < ActiveRecord::Migration[5.2]
  def change
    change_column_null :reviews, :business_id, true
  end
end
