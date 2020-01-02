const TelegramBot = require('node-telegram-bot-api')
const TOKEN = '700255579:AAE1L52siWh_vO6qzRVE2o4xMafFASfeX58'

const ADMIN = [550124331, 640286063]


const bot = new TelegramBot(TOKEN, {
    polling: true
});

var channel
var html
var text
var temp
var html1, html2

console.log('QORA TARIX has been started')
bot.on('polling_error', (err) => console.log(err))
bot.onText(/\/start/, (start) => {
    if (start.from.id == ADMIN[0] || start.from.id == ADMIN[1]) {
        bot.sendMessage(start.chat.id, 'CHOOSE CHANNEL', {
            reply_markup: {
                inline_keyboard: 
                [
                    [
                        {
                            text: 'BILASIZMI?',
                            callback_data: 'bilasizmi'
                        },
                        {
                            text: 'QORA TARIX',
                            callback_data: 'tarix'
                        }
                    ]
                ]
            }
        })
    }
    else {
        bot.sendMessage(start.chat.id, 'YOU ARE NOT ADMIN!!!')
    }    
})

bot.on('callback_query', (query) => {
    const {chat, message_id, text} = query.message
    switch (query.data) {
        case 'bilasizmi':
            bot.sendMessage(chat.id, 'Send me a post for BILASIZMI?')
            bot.on('photo', (postB) => {
                bot.sendPhoto(-1001261271043, postB.photo[0].file_id, {
                    caption: `
<b>${postB.caption}</b>
    
<a href="https://t.me/joinchat/AAAAAEsteANyfWvQJigWSg">BILASIZMI?</a>
                    `, 
                    parse_mode: 'HTML'
                })
                console.log(postB.caption)
            })
            break;
        case 'tarix':
            bot.sendMessage(chat.id, 'Send me a post for QORA TARIX')
            bot.on('photo', (postT) => {
                bot.sendPhoto(-1001323413000, postT.photo[0].file_id,  {
                    caption: `
<a href="https://t.me/joinchat/AAAAAE7hrgjQ0IFCNwRlkg">TARIXIY</a>   
<b>${postT.caption}</b>
                    `,
                    parse_mode: 'HTML'
                })
                console.log(postT.caption)
            })
        default:
            bot.sendMessage(chat.id, 'Send me only PHOTO')
            break;
    }
})