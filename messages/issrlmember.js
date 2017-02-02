var builder = require('botbuilder');

module.exports = {
    Label: 'Is SRL Member',
    Dialog: [
        // Room reservation confirmation ID
        function (session) {
            builder.Prompts.choice(
                session,
                'Thank you for your interest to be part of the Marina Bay Sands family. Please indicate your area of interest.',
                ['Membership Points', 'SRL Discount Outlets', 'How to earn & redeem', 'Other Enquiries'],
                {
                    maxRetries: 3,
                    retryPrompt: 'Not a valid option',
                    listStyle: builder.ListStyle.button
                }
            );
        },
        function (session, results, next) {
            //session.dialogData.employeename = results.response;
            next();
        },

        // SRL Membership ID
        function (session) {
            builder.Prompts.text(session, 'Please enter your Sands Rewards Lifestyle membership ID.');
        },
        function (session, results, next) {
            session.dialogData.srlmembershipid = results.response;
            next();
        },

        // Preferred contact
        function (session) {
            builder.Prompts.text(session, 'Please enter your preferred contact number.');
        },
        function (session, results, next) {
            session.dialogData.contact = results.response;
            next();
        },

        // Preferred contact
        function (session) {
            builder.Prompts.text(session, 'Please enter your inquiry here and we will get back to you as soon as possible!');
        },
        function (session, results, next) {
            session.dialogData.enquiry = results.response;
            session.send('%s asked %s Please contact him/her at %s', session.dialogData.srlmembershipid, session.dialogData.enquiry, session.dialogData.contact);
            return session.endDialog();
        },
    ]
}