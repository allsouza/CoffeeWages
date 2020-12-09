class AddPayFrequencyToReviews < ActiveRecord::Migration[5.2]
  def change
    add_column :reviews, :pay_frequency, :string, null:false
  end
end
