var builder = require('botbuilder');

module.exports = {
    Label: 'Is SRL Member',
    Dialog: [
        // Room reservation confirmation ID
        function (session) {
            builder.Prompts.choice(
                session,
                'IsSRLMember_InterestedArea',
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
            builder.Prompts.text(session, 'IsSRLMember_SRL_ID');
        },
        function (session, results, next) {
            session.dialogData.srlmembershipid = results.response;
            next();
        },

        // Preferred contact
        function (session) {
            builder.Prompts.text(session, 'IsSRLMember_Contact_No');
        },
        function (session, results, next) {
            session.dialogData.contact = results.response;
            next();
        },

        // Preferred contact
        function (session) {
            builder.Prompts.text(session, 'IsSRLMember_Enquiry');
        },
        function (session, results, next) {
            session.dialogData.enquiry = results.response;
            session.send('%s asked %s Please contact him/her at %s', session.dialogData.srlmembershipid, session.dialogData.enquiry, session.dialogData.contact);
            return session.endDialog();
        },
    ]
}