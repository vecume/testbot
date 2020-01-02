const TelegramBot = require('node-telegram-bot-api')
const TOKEN = '868612080:AAGb2DhnmH3CMBBk2kS2X2DZixBnXGmmKx8'

const ADMIN = [550124331, 640286063]


const bot = new TelegramBot(TOKEN, {
    polling: true
});

console.log('QORA TARIX has been started!')
bot.on('polling_error', (err) => console.log(err))
bot.on('photo', (postT) => {
  if (postT.from.id == ADMIN[0] || postT.from.id == ADMIN[1]) {
      bot.sendPhoto(-1001323413000, postT.photo[0].file_id,  {
        caption: `
<a href="https://t.me/joinchat/AAAAAE7hrgjQ0IFCNwRlkg">TARIXIY</a>   
<b>${postT.caption}</b>
        `,
        parse_mode: 'HTML'
      })
    }
    else {
      bot.sendMessage(postT.from.id, 'YOU ARE NOT ADMIN!!!')
    }
})
