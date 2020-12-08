class ChangeEndDateToString < ActiveRecord::Migration[5.2]
  def change
    change_column :reviews, :end_date, :string
  end
end
