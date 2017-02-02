var builder = require('botbuilder');

module.exports = {
    Label: 'Enquiries',
    Dialog: [
        // Email
        function (session) {
            builder.Prompts.text(session, 'Please enter your email address first so we can follow up with your inquiry.');
        },
        function (session, results, next) {
            session.dialogData.email = results.response;
            next();
        },

        // Enquiry
        function (session) {
            builder.Prompts.text(session, 'Now enter your inquiry here and we will get back to you as soon as possible!');
        },
        function (session, results, next) {
            session.dialogData.enquiry = results.response;
            session.send('%s asked: %s', session.dialogData.email, session.dialogData.enquiry);
            session.endDialog();
        }
    ]
};