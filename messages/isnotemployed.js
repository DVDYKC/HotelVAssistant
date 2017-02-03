var builder = require('botbuilder');

module.exports = {
    Label: 'Is Not Employed',
    Dialog: [
        // Confirm check-in
        function (session) {
            builder.Prompts.choice(
                session,
                'IsNotEmployed_InterestedArea',
                ['Casino', 'Housekeeping', 'F&B Operations', 'Other Professions'],
                {
                    maxRetries: 3,
                    retryPrompt: 'Not a valid option',
                    listStyle: builder.ListStyle.button
                }
            );
        },
        function (session, results) {
            //session.send('Please send your resume/CV to recruitment@marinabaysands.com stating the position you are interested in. Kindly note that only shortlisted candidates will be contacted. Thank you.');
            //return session.endDialog();
            builder.Prompts.choice(
                session,
                'IsNotEmployed_CV',
                ['Home'],
                {
                    maxRetries: 3,
                    retryPrompt: 'Not a valid option',
                    listStyle: builder.ListStyle.button
                }
            );
        },
        function (session, results) {
            session.endDialog();
            return session.beginDialog('/start');
        }
    ]
}