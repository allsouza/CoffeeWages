class Review < ApplicationRecord
    validates :business_id, :position, :wage, presence:true

    belongs_to :business


end
