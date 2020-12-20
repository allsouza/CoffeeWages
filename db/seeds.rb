# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Review.delete_all
# Business.delete_all

# require 'csv'

# csv_text = File.read(Rails.root.join('lib', 'seeds', 'wages.csv'))
# csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')

# csv.each do |row|
#     review = Review.new
#     business = Business.find_by(name: row['business_name'])
#     business = business && business.location == row['location'] ? business : Business.new
#     business.name = row['business_name']
#     business.location = row['location']
#     business.save!

#     review.business_id = business.id
#     review.position = row['position']
#     review.employment_type = row['employment_type']
#     review.pay_frequency = row['pay_frequency']
#     review.wage = row['wage']
#     review.gender = row['gender']
#     review.orientation = row['orientation']
#     review.race = row['race']
#     review.tips = row['tips'].to_i > 0 ? row['tips'].to_i : false
#     review.start_date = row['start_date']
#     review.end_date = row['end_date']
#     review.notes = row['notes']

#     review.save!
# end

reviews = Review.all

reviews.each do |review|
    if review.wage == 0
        review.destroy
    end
    review.pay_frequency = 'Yearly' if review.wage > 100
    review.save!
end
