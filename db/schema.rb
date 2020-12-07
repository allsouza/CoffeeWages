# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_12_07_151927) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "businesses", force: :cascade do |t|
    t.string "name", null: false
    t.string "address", null: false
    t.string "coordinates", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_businesses_on_name"
  end

  create_table "reviews", force: :cascade do |t|
    t.integer "business_id", null: false
    t.string "position", null: false
    t.date "start_date", null: false
    t.date "end_date", null: false
    t.string "employment_type", null: false
    t.float "wage", null: false
    t.boolean "tips", null: false
    t.string "gender"
    t.string "orientation"
    t.string "race"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["position"], name: "index_reviews_on_position"
    t.index ["wage"], name: "index_reviews_on_wage"
  end

end
