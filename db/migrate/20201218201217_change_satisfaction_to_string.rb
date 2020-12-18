class ChangeSatisfactionToString < ActiveRecord::Migration[5.2]
  def change
    remove_column :reviews, :satisfaction
    add_column :reviews, :satisfaction, :integer
  end
end
