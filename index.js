const TelegramBot = require('node-telegram-bot-api')
const TOKEN = '700255579:AAE1L52siWh_vO6qzRVE2o4xMafFASfeX58'

const ADMIN = [550124331, 640286063]


bot = new TelegramBot(TOKEN, {
    polling: true
});

var channel
var html
var text
var temp
var html1, html2

console.log('Bot has been started')
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
    temp = check.text
    switch (temp) {
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
    text = p.caption

    html1 = `
<a href="${link}">${linkText}</a>   
<b>${text}</b>
    `
    html2 = `
<b>${text}</b>

<a href="${link}">${linkText}</a>
    `

    switch (temp) {
        case 'BILASIZMI?':
            html = html2
            break;
        case 'QORA TARIX':
            html = html1
        default:
            break;
    }

    if (p.from.id == ADMIN[0] || p.from.id == ADMIN[1]) {
        bot.sendPhoto(channel, `${p.photo[0].file_id}`, {
            caption: html,
            parse_mode:'HTML'
        })
    }
    else {
        bot.sendMessage(p.chat.id, 'YOU ARE NOT ADMIN!!!')
    }
})