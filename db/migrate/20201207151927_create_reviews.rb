class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.integer :business_id, null:false
      t.string :position, null:false
      t.date :start_date, null:false
      t.date :end_date, null:false
      t.string :employment_type, null:false
      t.float :wage, null:false
      t.boolean :tips, null:false
      t.string :gender
      t.string :orientation
      t.string :race
      t.index :position
      t.index :wage
      t.timestamps
    end
  end
end
