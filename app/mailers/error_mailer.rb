class ErrorMailer < ApplicationMailer
    default from: 'system@coffeewages.com'

    def bug_report(subject, body)
        mail(to: 'andre.llsouza8@gmail.com', 
            subject: subject,
            content_type: 'text/html',
            body: body)
    end
end
