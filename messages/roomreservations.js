var builder = require('botbuilder');

module.exports = {
    Label: 'Room Reservations',
    Dialog: [
        // Confirm check-in
        function (session) {
            builder.Prompts.confirm(
                session,
                'Do you have an existing and confirmed reservation with us?',
                {
                    listStyle: builder.ListStyle.button
                });
        },
        function (session, results) {
            if (results.response) {
                return session.beginDialog('withroomreservations');
            } else {
                return session.beginDialog('withoutroomreservations');
            }
        },
    ]
}