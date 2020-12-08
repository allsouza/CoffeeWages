class ChangeReviews < ActiveRecord::Migration[5.2]
  def change
    add_column :reviews, :business_name, :string
    remove_column :reviews, :tips, :boolean
    add_column :reviews, :tips, :float
    remove_column :reviews, :start_date, :date
    remove_column :reviews, :end_date, :date
    add_column :reviews, :start_date, :integer
    add_column :reviews, :end_date, :integer
  end
end
