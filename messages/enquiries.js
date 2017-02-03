var builder = require('botbuilder');

module.exports = {
    Label: 'Enquiries',
    Dialog: [
        // Email
        function (session) {
            builder.Prompts.text(session, 'Enquiries_EmailAddress');
        },
        function (session, results, next) {
            session.dialogData.email = results.response;
            next();
        },

        // Enquiry
        function (session) {
            builder.Prompts.text(session, 'Enquiries_EnterEnquiry');
        },
        function (session, results, next) {
            session.dialogData.enquiry = results.response;
            session.send('%s asked: %s', session.dialogData.email, session.dialogData.enquiry);
            session.endDialog();
        }
    ]
};