class Review < ApplicationRecord
    validates :position, :start_date, :end_date, :employment_type, :wage, :tips, presence:true

    belongs_to :business


end
