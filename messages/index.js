"use strict";
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");

var useEmulator = (process.env.NODE_ENV == 'development');
//var useEmulator = true;
var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

var bot = new builder.UniversalBot(connector);

/*bot.dialog('/', function (session) {
    session.send('You said dd' + session.message.text);
});*/

if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function() {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());    
} else {
    module.exports = { default: connector.listen() }
}

// Dialogs
var RoomReservations = require('./roomreservations');
var WithRoomReservations = require('./withroomreservations');
var WithoutRoomReservations = require('./withoutroomreservations');
var TheatreShows = require('./theatreshows');
var Employment = require('./employment');
var IsEmployed = require('./isemployed');
var IsNotEmployed = require('./isnotemployed');
var SRLMembership = require('./srlmembership');
var IsSRLMember = require('./issrlmember');
var IsNotSRLMember = require('./isnotsrlmember');
var Enquiries = require('./enquiries');

// Setup dialogs
bot.dialog('roomreservations', RoomReservations.Dialog);
bot.dialog('withroomreservations', WithRoomReservations.Dialog);
bot.dialog('withoutroomreservations', WithoutRoomReservations.Dialog);
bot.dialog('theatreshows', TheatreShows.Dialog);
bot.dialog('employment', Employment.Dialog);
bot.dialog('isemployed', IsEmployed.Dialog);
bot.dialog('isnotemployed', IsNotEmployed.Dialog);
bot.dialog('srlmembership', SRLMembership.Dialog);
bot.dialog('issrlmember', IsSRLMember.Dialog);
bot.dialog('isnotsrlmember', IsNotSRLMember.Dialog);
bot.dialog('enquiries', Enquiries.Dialog);

// Configure bots default locale and locale folder path.
bot.set('localizerSettings', {
    botLocalePath: __dirname + "/localex", 
    defaultLocale: "en" 
});


// Root dialog
// TODO: to start main hero card first before user message
bot.dialog('/', new builder.IntentDialog()
    .matchesAny([/help/i, /support/i, /problem/i], [
        function (session) {
            session.beginDialog('support');
        },
        function (session, result) {
            var tickerNumber = result.response;
            session.send('Thanks for contacting our support team. Your ticket number is %s.', tickerNumber);
            session.endDialog();
        }
    ])
    .onDefault([
        function (session) {
            console.log('Step1');
            if(session.message.text.trim() == 'English' || session.message.text.trim() == '中文'){
                var locale;
                if(session.message.text.trim() == '中文'){
                    locale = 'zh';
                }
                else {
                    locale = 'en';
                }
                session.preferredLocale(locale, function (err) {
                    if (!err) {
                        // Locale files loaded
                        session.endDialog();
                        session.beginDialog('/start');
                    } else {
                        // Problem loading the selected locale
                        session.error(err);
                    }
                });
                
            }
            else {
                console.log('Step3');
                var welcomeCard = new builder.HeroCard(session)
                .title('Warmest greetings!')
                .text('We are happy to assist you with any enquiry! Please select a language to begin')
                .images([
                    new builder.CardImage(session)
                        .url('http://logos-download.com/wp-content/uploads/2016/05/Marina_Bay_Sands_logo_small.png')
                        .alt('MBS')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'English', 'English'), 
                    builder.CardAction.imBack(session, '中文', '中文'),
                ]);

                session.send(new builder.Message(session)
                    .addAttachment(welcomeCard));                    
            }
        }        
    ]));

    bot.dialog('/start',[
        function (session) {
            // prompt option
            var options = session.localizer.gettext(session.preferredLocale(), "greetings_response");
            console.log(options);
            builder.Prompts.choice(
                session,
                "greetings_response",
                //'What can we help you with today? Please tap on one of the buttons below. Swipe right for more options.',
                [RoomReservations.Label, TheatreShows.Label, Employment.Label, SRLMembership.Label],
                {
                    maxRetries: 3,
                    retryPrompt: 'Not a valid option',
                    listStyle: builder.ListStyle.button
                });
        },
        function (session, result) {
            if (!result.response) {
                // exhausted attemps and no selection, start over
                session.send('Ooops! Too many attemps :( But don\'t worry, I\'m handling that exception and you can try again!');
                return session.endDialog();
            }

            // on error, start over
            session.on('error', function (err) {
                session.send('Failed with message: %s', err.message);
                session.endDialog();
            });

            // continue on proper dialog
            var selection = result.response.entity;
            switch (selection) {
                case RoomReservations.Label:
                    return session.beginDialog('roomreservations');
                case TheatreShows.Label:
                    return session.beginDialog('theatreshows');
                case Employment.Label:
                    return session.beginDialog('employment');
                case SRLMembership.Label:
                    return session.beginDialog('srlmembership');
            }
        }
    ]);