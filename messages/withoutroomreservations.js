var builder = require('botbuilder');
var fs = require('fs');
var util = require('util');

module.exports = {
    Label: 'Without Room Reservations',
    Dialog: [
        // Known enquiries
        function (session) {
            builder.Prompts.choice(
                session,
                'Thank you for your interest in staying with us. What would you like to know today?',
                ['Rooms Types', 'See all promotions', 'Other', 'Back'],
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
                    var roomTypes = getRoomTypesAttachments();
                    var reply = new builder.Message(session)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments(roomTypes);
                    session.send(reply);
                    //return session.endDialog();
                    session.beginDialog('/start');
                case 'See all promotions':
                    var promotions = getPromotionsAttachments();
                    var reply = new builder.Message(session)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments(promotions);
                    session.send(reply);
                    return session.endDialog();
                case 'Other':
                    return session.beginDialog('enquiries');
                case 'Back':
                    return session.beginDialog('/start'); //TODO: to start onDefault of root dialog
            }           
        }
    ]
};

function getRoomTypesAttachments(session) {
	
	/*var contentType = 'image/png';
	var bitmap = fs.readFileSync('./images/room1.png');	
	var base64 = Buffer.from(bitmap).toString('base64');*/
	// console.log(base64);
    return [
		
        new builder.HeroCard(session)
            .title('Deluxe Room')
            .subtitle('39 square meters, plush, gold-and-earth toned furnishings in natural lighting.')
            .text('')
            .images([
                builder.CardImage.create(session, 'https://c2.staticflickr.com/8/7461/16236756261_2b915eb2aa_b.jpg')
				//builder.CardImage.create(session, util.format('data:%s;base64,%s', contentType , base64))
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://booking.marinabaysands.com/booking/search', 'Check Availability'),
                builder.CardAction.openUrl(session, 'http://www.marinabaysands.com/mbs/rooms-suites/deluxe-room.html', 'Room Details')
            ]),
        
        new builder.HeroCard(session)
            .title('Premier Room')
            .subtitle('42 square meters, bathroom with glass-enclosed shower and deep-soaking bathtub.')
            .text('')
            .images([
                builder.CardImage.create(session, 'https://c2.staticflickr.com/8/7461/16236756261_2b915eb2aa_b.jpg')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://booking.marinabaysands.com/booking/search', 'Check Availability'),
                builder.CardAction.openUrl(session, 'http://www.marinabaysands.com/hotel/rooms-suites/premier-room.html', 'Room Details')
            ]),

        new builder.HeroCard(session)
            .title('Family Room')
            .subtitle('86 square meters, nespresso machine, furnished balcony with garden view.')
            .text('')
            .images([
                builder.CardImage.create(session, 'https://c2.staticflickr.com/8/7461/16236756261_2b915eb2aa_b.jpg')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://booking.marinabaysands.com/booking/search', 'Check Availability'),
                builder.CardAction.openUrl(session, 'http://www.marinabaysands.com/hotel/rooms-suites/family-room.html', 'Room Details')
            ]),

        new builder.HeroCard(session)
            .title('The Club Room')
            .subtitle('61 square meters, exclusive access to Club55 lounge on the 55th floor.')
            .text('')
            .images([
                builder.CardImage.create(session, 'https://c2.staticflickr.com/8/7461/16236756261_2b915eb2aa_b.jpg')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://booking.marinabaysands.com/booking/search', 'Check Availability'),
                builder.CardAction.openUrl(session, 'http://www.marinabaysands.com/hotel/rooms-suites/club-room.html', 'Room Details')
            ]),

        new builder.HeroCard(session)
            .title('Grand Club Room')
            .subtitle('79 square meters of everything the Club Room offers and more.')
            .text('')
            .images([
                builder.CardImage.create(session, 'https://c2.staticflickr.com/8/7461/16236756261_2b915eb2aa_b.jpg')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://booking.marinabaysands.com/booking/search', 'Check Availability'),
                builder.CardAction.openUrl(session, 'http://www.marinabaysands.com/hotel/rooms-suites/grand-club-room.html', 'Room Details')
            ]),

        new builder.HeroCard(session)
            .title('Need more space? Check out our suites.')
            .subtitle('First class amenities, the crown jewels of Marina Bay Sands.')
            .text('')
            .images([
                builder.CardImage.create(session, 'https://c2.staticflickr.com/8/7461/16236756261_2b915eb2aa_b.jpg')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'http://www.marinabaysands.com/hotel/rooms-suites/suites.html', 'View All Suites')
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