
json.id review.id
json.businessId review.business_id
json.position review.position
json.startDate review.start_date
json.payFrequency review.pay_frequency
json.endDate review.end_date.to_i.to_s == review.end_date ? review.end_date.to_i : review.end_date
json.employmentType review.employment_type
json.wage review.wage
json.tips review.tips
json.avgTips review.avg_tips
json.gender review.gender
json.orientation review.orientation
json.race review.race
json.shopName review.business.name
json.location review.business.location.split(",").join(", ")
json.satisfaction review.satisfaction
json.notes review.notes
json.updatedAt review.updated_at
