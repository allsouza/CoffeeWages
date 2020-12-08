class Business < ApplicationRecord
    validates :name, :address, :coordinates, presence:true
    validates :coordinates, uniqueness:true

    has_many :reviews

end
