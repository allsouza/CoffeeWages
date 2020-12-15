class Error < ApplicationRecord
    def self.send_email(subject, body)
        Mail.defaults do 
            delivery_method :smtp, address: '127.0.0.1:1025', port: 1025
        end
        
        email = Mail.new do 
            from 'bug@coffeewages.com'
            to 'andre.llsouza@gmail.com'
            subject subject
            body body
        end


        email.deliver
    end
end