var builder = require('botbuilder');

module.exports = {
    Label: 'With Room Reservations',
    Dialog: [
        // Room reservation confirmation ID
        function (session) {
            session.send('Thanks for staying with us. Just a few questions to help us serve you better.');
            builder.Prompts.text(session, 'Please enter your room reservation confirmation ID.');
        },
        function (session, results, next) {
            session.dialogData.confirmationid = results.response;
            next();
        },

        // Enquiry
        function (session) {
            builder.Prompts.text(session, 'What can we assist you with? Leave us a message and we will get back to you as soon as possible.');
        },
        function (session, results, next) {
            session.dialogData.enquiry = results.response;
            session.send('%s asked: %s', session.dialogData.confirmationid, session.dialogData.enquiry);
            session.endDialog();
        }
    ]
};