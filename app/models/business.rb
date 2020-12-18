class Business < ApplicationRecord
    validates :name, presence:true
    has_many :reviews
    before_save :titleize

    def self.searchApi(terms)
        resp = Faraday.get("https://maps.googleapis.com/maps/api/place/textsearch/json") do |req|
            req.params['query'] = terms
            req.params['radius'] = 5000
            req.params['key'] = Figaro.env.places_key
        end
        JSON.parse(resp.body)['results']
    end

    def normalizeFields
        self.name.strip!
        self.location.strip!
    end

    def titleize
        self.name = self.name.split(" ").map { |word| word.capitalize }.join(" ")
        self.location = self.location.split(" ").map { |word| word.capitalize }.join(" ")
    end
end
