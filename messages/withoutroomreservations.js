var builder = require('botbuilder');
var fs = require('fs');
var util = require('util');

module.exports = {
    Label: 'Without Room Reservations',
    Dialog: [
        // Known enquiries
        function (session) {
            var options = session.localizer.gettext(session.preferredLocale(), "WithoutRoomReservations_Know_Prompt");
            builder.Prompts.choice(
                session,
                'Thank_Stay_Know',
                options,
                {
                    maxRetries: 3,
                    retryPrompt: 'Not a valid option',
                    listStyle: builder.ListStyle.button
                }
            );
        },
        function (session, results) {
            var selection = results.response.entity;            
            switch (selection) {
                case 'Rooms Types':
                    var roomTypes = getRoomTypesAttachments(session);
                    var reply = new builder.Message(session)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments(roomTypes);
                    session.send(reply);
                    return session.endDialog();
                    //session.beginDialog('/start');
                case 'See all promotions':
                    var promotions = getPromotionsAttachments(session);
                    var reply = new builder.Message(session)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments(promotions);
                    session.send(reply);
                    return session.endDialog();
                case 'Other':
                    return session.beginDialog('enquiries');
                case 'Back':
                    return session.beginDialog('/start'); //TODO: to start onDefault of root dialog
                case '查看房型':
                    var roomTypes = getRoomTypesAttachments(session);
                    var reply = new builder.Message(session)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments(roomTypes);
                    session.send(reply);
                    return session.endDialog();
                    //session.beginDialog('/start');
                case '查看所有促销':
                    var promotions = getPromotionsAttachments(session);
                    var reply = new builder.Message(session)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments(promotions);
                    session.send(reply);
                    return session.endDialog();
                case '其他':
                    return session.beginDialog('enquiries');
                case '回到主目录':
                    return session.beginDialog('/start'); //TODO: to start onDefault of root dialog
            }
            var options = session.localizer.gettext(session.preferredLocale(), "Main_Menu");
            builder.Prompts.choice(
                session,
                'IsNotEmployed_CV',
                options,
                {
                    maxRetries: 3,
                    retryPrompt: 'Not a valid option',
                    listStyle: builder.ListStyle.button
                }
            );           
        }
    ]
};

function getRoomTypesAttachments(session) {
	
	/*var contentType = 'image/png';
	var bitmap = fs.readFileSync('./images/room1.png');	
	var base64 = Buffer.from(bitmap).toString('base64');*/
	// console.log(base64);
    //var WithoutRoomReservations_Room_39 = session.localizer.gettext(session.preferredLocale(), "WithoutRoomReservations_Room_39");
    //var WithoutRoomReservations_Room_47 = session.localizer.gettext(session.preferredLocale(), "WithoutRoomReservations_Room_47");
    //var WithoutRoomReservations_Room_86 = session.localizer.gettext(session.preferredLocale(), "WithoutRoomReservations_Room_86");
    //var WithoutRoomReservations_Room_61 = session.localizer.gettext(session.preferredLocale(), "WithoutRoomReservations_Room_61");
    //var WithoutRoomReservations_Room_79 = session.localizer.gettext(session.preferredLocale(), "WithoutRoomReservations_Room_79");
    //var WithoutRoomReservations_Room_More = session.localizer.gettext(session.preferredLocale(), "WithoutRoomReservations_Room_More");
    //var WithoutRoomReservations_Room_More = session.localizer.gettext(session.preferredLocale(), "WithoutRoomReservations_Room_More");
    return [
		
        new builder.HeroCard(session)
            .title('WithoutRoomReservations_39')
            .subtitle('WithoutRoomReservations_Room_39')
            .text('')
            .images([
                builder.CardImage.create(session, 'http://hk.marinabaysands.com/content/dam/singapore/marinabaysands/master/main/home/hotel/web%20redesign%20room%20images/Deluxe%20Room/Deluxe%20City%20500X454.jpg')
				//builder.CardImage.create(session, util.format('data:%s;base64,%s', contentType , base64))
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://booking.marinabaysands.com/booking/search', 'WithoutRoomReservations_Check_Availability'),
                builder.CardAction.openUrl(session, 'http://www.marinabaysands.com/mbs/rooms-suites/deluxe-room.html', 'WithoutRoomReservations_Room_Details')
            ]),
        
        new builder.HeroCard(session)
            .title('WithoutRoomReservations_47')
            .subtitle('WithoutRoomReservations_Room_47')
            .text('')
            .images([
                builder.CardImage.create(session, 'http://www.marinabaysands.com/content/dam/singapore/marinabaysands/master/main/home/hotel/web%20redesign%20room%20images/Premier%20Room/premier-room-twin-city-500x454.jpg')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://booking.marinabaysands.com/booking/search', 'WithoutRoomReservations_Check_Availability'),
                builder.CardAction.openUrl(session, 'http://www.marinabaysands.com/hotel/rooms-suites/premier-room.html', 'WithoutRoomReservations_Room_Details')
            ]),

        new builder.HeroCard(session)
            .title('WithoutRoomReservations_86')
            .subtitle('WithoutRoomReservations_Room_86')
            .text('')
            .images([
                builder.CardImage.create(session, 'http://www.marinabaysands.com/content/dam/singapore/marinabaysands/master/main/home/hotel/web%20redesign%20room%20images/Family%20Room/family-room-500x454.jpg')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://booking.marinabaysands.com/booking/search', 'WithoutRoomReservations_Check_Availability'),
                builder.CardAction.openUrl(session, 'http://www.marinabaysands.com/hotel/rooms-suites/family-room.html', 'WithoutRoomReservations_Room_Details')
            ]),

        new builder.HeroCard(session)
            .title('WithoutRoomReservations_61')
            .subtitle('WithoutRoomReservations_Room_61')
            .text('')
            .images([
                builder.CardImage.create(session, 'http://www.marinabaysands.com/content/dam/singapore/marinabaysands/master/main/home/hotel/web%20redesign%20room%20images/Club%20Room/club-king-city-500x454.jpg')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://booking.marinabaysands.com/booking/search', 'WithoutRoomReservations_Check_Availability'),
                builder.CardAction.openUrl(session, 'http://www.marinabaysands.com/hotel/rooms-suites/club-room.html', 'WithoutRoomReservations_Room_Details')
            ]),

        new builder.HeroCard(session)
            .title('WithoutRoomReservations_79')
            .subtitle('WithoutRoomReservations_Room_79')
            .text('')
            .images([
                builder.CardImage.create(session, 'http://www.marinabaysands.com/content/dam/singapore/marinabaysands/master/main/home/hotel/web%20redesign%20room%20images/Grand%20Club%20Room/grand-club-city-500x454.jpg')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://booking.marinabaysands.com/booking/search', 'WithoutRoomReservations_Check_Availability'),
                builder.CardAction.openUrl(session, 'http://www.marinabaysands.com/hotel/rooms-suites/grand-club-room.html', 'WithoutRoomReservations_Room_Details')
            ]),

        new builder.HeroCard(session)
            .title('WithoutRoomReservations_More')
            .subtitle('WithoutRoomReservations_Room_More')
            .text('')
            .images([
                builder.CardImage.create(session, 'https://c2.staticflickr.com/8/7461/16236756261_2b915eb2aa_b.jpg')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'http://www.marinabaysands.com/hotel/rooms-suites/suites.html', 'WithoutRoomReservations_View_All_Suites')
            ])
    ];
}

function getPromotionsAttachments(session) {
    return [
        new builder.HeroCard(session)
            .title('See all current hotel offers')
            .subtitle('Book direct with us and always get the lowest available rate, guaranteed.')
            .text('')
            .images([
                builder.CardImage.create(session, 'https://c2.staticflickr.com/8/7461/16236756261_2b915eb2aa_b.jpg')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'http://www.marinabaysands.com/hotel/offers.html', 'See All Promotions')
            ]),
    ];
}