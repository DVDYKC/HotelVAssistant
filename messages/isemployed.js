var builder = require('botbuilder');

module.exports = {
    Label: 'Is Employed',
    Dialog: [
        // Room reservation confirmation ID
        function (session) {
            builder.Prompts.text(session, 'Please enter the name of your family member or relative working at Marina Bay Sands.');
        },
        function (session, results, next) {
            session.dialogData.employeename = results.response;
            next();
        },

        // Enquiry
        function (session) {
            builder.Prompts.text(session, 'Please enter your email address.');
        },
        function (session, results, next) {
            session.dialogData.email = results.response;
            session.send('Customer has relative %s with email %s asked:', session.dialogData.employeename, session.dialogData.email);
            return session.endDialog();
        }
    ]
}