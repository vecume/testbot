const TelegramBot = require('node-telegram-bot-api')
const TOKEN = '700255579:AAE1L52siWh_vO6qzRVE2o4xMafFASfeX58'

const ADMIN = [550124331, 640286063]


bot = new TelegramBot(TOKEN, {
    polling: true
});

var channel
var linkText
var link
bot.on('polling_error', (err) => console.log(err))

bot.onText(/\/start/, (start) => {
    if (start.from.id == ADMIN[0] || start.from.id == ADMIN[1]) {
        bot.sendMessage(start.chat.id, 'CHOOSE CHANNEL', {
            reply_markup: {
                keyboard: [
                    ['BILASIZMI?','QORA TARIX']
                ]
            }
        })
    }
    else {
        bot.sendMessage(start.chat.id, 'YOU ARE NOT ADMIN!!!')
    }    
})

bot.on('text', (check) => {
    switch (check.text) {
        case 'BILASIZMI?':
            channel = -1001261271043
            linkText = 'BILASIZMI?'
            link = 'https://t.me/joinchat/AAAAAEsteANyfWvQJigWSg'
            break;
        case 'QORA TARIX':
            channel = -1001323413000
            linkText = 'TARIXIY'
            link = 'https://t.me/joinchat/AAAAAE7hrgjQ0IFCNwRlkg'
            break
        default:
            channel = -1001439300684
            break;
    }
})


bot.on('photo', (p) => {
    var text = p.caption
    var finalText = `
    <a href="${link}">${linkText}</a>
<b>${text}</b>
    `
    if (p.from.id == ADMIN[0] || p.from.id == ADMIN[1]) {
        bot.sendPhoto(channel, `${p.photo[0].file_id}`, {
            caption: finalText,
            parse_mode:'HTML'
        })
    }
    else {
        bot.sendMessage(p.chat.id, 'YOU ARE NOT ADMIN!!!')
    }
})


