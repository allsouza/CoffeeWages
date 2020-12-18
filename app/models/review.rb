class Review < ApplicationRecord
    validates :business_id, :position, :wage, :pay_frequency, presence:true
    before_save :normalizeFields
    belongs_to :business

    def titleize
        self.position = self.position.split(" ").map { |word| word.capitalize }.join(" ")
    end

    def normalizeFields
        self.position.strip!
        self.pay_frequency.strip!
    end
end
