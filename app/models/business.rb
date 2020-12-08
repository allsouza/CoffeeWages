class Business < ApplicationRecord
    validates :name, presence:true
    validates :name, :address, :coordinates, uniqueness:true, allow_nil:true

    has_many :reviews

    def self.searchApi(terms)
        resp = Faraday.get("https://maps.googleapis.com/maps/api/place/textsearch/json") do |req|
            req.params['query'] = terms
            req.params['radius'] = 5000
            req.params['key'] = Figaro.env.places_key
        end
        JSON.parse(resp.body)['results']
    end
end
