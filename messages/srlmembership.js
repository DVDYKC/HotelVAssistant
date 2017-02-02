var builder = require('botbuilder');

module.exports = {
    Label: 'SRL Membership',
    Dialog: [
        // Confirm check-in
        function (session) {
            builder.Prompts.confirm(
                session,
                'Are you an existing Sands Rewards Lifestyle member?',
                {
                    listStyle: builder.ListStyle.button
                });
        },
        function (session, results) {
            if (results.response) {
                return session.beginDialog('issrlmember');
            } else {
                return session.beginDialog('isnotsrlmember');
            }
        },
    ]
}