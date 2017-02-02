var builder = require('botbuilder');

module.exports = {
    Label: 'Room Reservations',
    Dialog: [
        // Confirm check-in
        function (session) {
            builder.Prompts.confirm(
                session,
                'Confirm_Reservation',
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