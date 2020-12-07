class Business < ApplicationRecord
    validates :name, :address, :coordinates, presence:true
    validates :name, :address, :coordinates, unique:true

    has_many :reviews


end
