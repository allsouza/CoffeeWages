class RemoveNullFromEmploymentType < ActiveRecord::Migration[5.2]
  def change
    change_column_null :reviews, :employment_type, true
  end
end
