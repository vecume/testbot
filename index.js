const TOKEN = '700255579:AAE1L52siWh_vO6qzRVE2o4xMafFASfeX58'
const TelegramBot = require('node-telegram-bot-api'),
    port = process.env.PORT || 443,
    host = '0.0.0.0',  // probably this change is not required
    externalUrl = process.env.CUSTOM_ENV_VARIABLE || 'https://my-app.herokuapp.com',
    token = process.env.TOKEN,
    bot = new TelegramBot(process.env.TOKEN, { webHook: { port : port, host : host } });
bot.setWebHook(externalUrl + ':443/bot' + token);

const ADMIN = [550124331, 640286063]

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


