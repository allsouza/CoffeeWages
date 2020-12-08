class Business < ApplicationRecord
    validates :name, :location, presence:true
    validates :name, :address, :coordinates, uniqueness:true, allow_nil:true

    has_many :reviews


end
