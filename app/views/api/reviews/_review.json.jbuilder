
json.id review.id
json.businessId review.business_id
json.position review.position
json.startDate review.start_date
json.payFrequency review.pay_frequency
json.endDate review.end_date = "Current" ? review.end_date : review.end_date.to_i
json.employmentType review.employment_type
json.wage review.wage
json.tips review.tips
json.gender review.gender
json.orientation review.orientation
json.race review.race
json.shopName review.business.name
json.location review.business.location
json.notes review.notes
