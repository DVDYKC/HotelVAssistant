var builder = require('botbuilder');

module.exports = {
    Label: 'Theatre Shows',
    Dialog: [
        // Confirm check-in
        function (session) {
            var options = session.localizer.gettext(session.preferredLocale(), "Theatreshows_Prompt");
            builder.Prompts.choice(
                session,
                'Thank_MasterCard_Help',
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
                case 'Browse shows':
                    var shows = getShowsAttachments(session);
                    var reply = new builder.Message(session)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments(shows);
                    session.send(reply);
                    return session.endDialog();
                case 'Other Enquiry':
                    return session.beginDialog('enquiries');
                case '瀏覽節目':
                    var shows = getShowsAttachments(session);
                    var reply = new builder.Message(session)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments(shows);
                    session.send(reply);
                    return session.endDialog();
                case '其他查詢':
                    return session.beginDialog('enquiries');
            }
        },
    ]
}

function getShowsAttachments(session) {
    return [
        new builder.HeroCard(session)
            .title('Chicago')
            .subtitle('Murder, greed, corruption, exploitation, adultery and treachery.')
            .text('')
            .images([
                builder.CardImage.create(session, 'http://entertainment.marinabaysands.com/sistic/images/events/10949/1473738360028.jpg')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://ticketing.marinabaysands.com/MBSWebApp/Booking.do?contentCode=chicago0217#', 'Theatreshows_Book_Prompt'),
                builder.CardAction.openUrl(session, 'http://entertainment.marinabaysands.com/events/chicago0217', 'Theatreshows_Show_Info_Prompt')
            ]),
        
        new builder.HeroCard(session)
            .title('SingJazz')
            .subtitle('A weekend of exhilirating music performances by Grammy Award winning artistes!')
            .text('')
            .images([
                builder.CardImage.create(session, 'http://entertainment.marinabaysands.com/sistic/images/events/11030/1483928033331.jpg')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://ticketing.marinabaysands.com/MBSWebApp/Booking.do?contentCode=sing0417', 'Theatreshows_Book_Prompt'),
                builder.CardAction.openUrl(session, 'http://entertainment.marinabaysands.com/events/sing0417', 'Theatreshows_Show_Info_Prompt')
            ]),

        new builder.HeroCard(session)
            .title('狗魅 Sylvia')
            .subtitle('Sylvia, by A.R. Gurney, is a modern romantic comedy about a marriage and a dog.')
            .text('')
            .images([
                builder.CardImage.create(session, 'http://entertainment.marinabaysands.com/sistic/images/events/11034/1485144515703.jpg')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://ticketing.marinabaysands.com/MBSWebApp/Booking.do?contentCode=sylvia0117', 'Theatreshows_Book_Prompt'),
                builder.CardAction.openUrl(session, 'http://entertainment.marinabaysands.com/events/sylvia0117', 'Theatreshows_Show_Info_Prompt')
            ]),

        new builder.HeroCard(session)
            .title('View all upcoming shows')
            .subtitle('At the Mastercard Theatres, Asia\'s leading entertainment destination.')
            .text('')
            .images([
                builder.CardImage.create(session, 'https://db.com.sg/wp-content/uploads/2016/01/Marina-Bay-Sands-Theatre-Image-01-400x300.jpg')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'http://entertainment.marinabaysands.com/allevents', 'Theatreshows_View_All_Prompt')
            ])
    ];
}