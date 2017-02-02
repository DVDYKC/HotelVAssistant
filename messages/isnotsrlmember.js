var builder = require('botbuilder');

module.exports = {
    Label: 'Is Not SRL Member',
    Dialog: [

        function (session) {
            return session.endDialog();
        },
    ]
}