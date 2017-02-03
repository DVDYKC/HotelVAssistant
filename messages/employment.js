var builder = require('botbuilder');

module.exports = {
    Label: 'Employment',
    Dialog: [
        // Confirm check-in
        function (session) {
            var options = session.localizer.gettext(session.preferredLocale(), "All_Yes_No");
            builder.Prompts.confirm(
                session,
                'Employement_FamilyMember',
                options,
                {
                    listStyle: builder.ListStyle.button
                });
        },
        function (session, results) {
            if (results.response == 'YES' || results.response == '是') {
                return session.beginDialog('isemployed');
            } else {
                return session.beginDialog('isnotemployed');
            }
        },
    ]
}