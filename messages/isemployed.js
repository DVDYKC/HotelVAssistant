var builder = require('botbuilder');

module.exports = {
    Label: 'Is Employed',
    Dialog: [
        // Room reservation confirmation ID
        function (session) {
            builder.Prompts.text(session, 'IsEmployed_FamilyMember');
        },
        function (session, results, next) {
            session.dialogData.employeename = results.response;
            next();
        },

        // Enquiry
        function (session) {
            builder.Prompts.text(session, 'IsEmployed_EmailAddress');
        },
        function (session, results, next) {
            session.dialogData.email = results.response;
            session.send('Customer has relative %s with email %s asked:', session.dialogData.employeename, session.dialogData.email);
            return session.endDialog();
        }
    ]
}