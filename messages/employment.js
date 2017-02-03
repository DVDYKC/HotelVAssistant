var builder = require('botbuilder');

module.exports = {
    Label: 'Employment',
    Dialog: [
        // Confirm check-in
        function (session) {
            builder.Prompts.confirm(
                session,
                'Employement_FamilyMember',
                {
                    listStyle: builder.ListStyle.button
                });
        },
        function (session, results) {
            if (results.response) {
                return session.beginDialog('isemployed');
            } else {
                return session.beginDialog('isnotemployed');
            }
        },
    ]
}