var builder = require('botbuilder');

module.exports = {
    Label: 'With Room Reservations',
    Dialog: [
        // Room reservation confirmation ID
        function (session) {
            session.send('WithRoomReservations_Question');
            builder.Prompts.text(session, 'WithRoomReservations_Confirmation_ID');
        },
        function (session, results, next) {
            session.dialogData.confirmationid = results.response;
            next();
        },

        // Enquiry
        function (session) {
            builder.Prompts.text(session, 'WithRoomReservations_Leave_Msg');
        },
        function (session, results, next) {
            session.dialogData.enquiry = results.response;
            session.send('%s asked: %s', session.dialogData.confirmationid, session.dialogData.enquiry);
            session.endDialog();
        }
    ]
};