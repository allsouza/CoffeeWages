class Review < ApplicationRecord
    validates :business_id, :position, :wage, :pay_frequency, presence:true

    belongs_to :business


end
