const TelegramBot = require('node-telegram-bot-api')
const TOKEN = '1017364845:AAHoXW8f2Zve2pNuiUCa__TO5WUvN6D66vU'

const ADMIN = [550124331, 640286063]


const bot = new TelegramBot(TOKEN, {
    polling: true
});

console.log('BILASIZMI has been started!')
bot.on('polling_error', (err) => console.log(err))
bot.on('photo', (postB) => {
  if (postB.from.id == ADMIN[0] || postB.from.id == ADMIN[1]) {
      bot.sendPhoto(-1001261271043, postB.photo[0].file_id,  {
          caption: `
<b>${postB.caption}</b>

<a href="https://t.me/joinchat/AAAAAEsteANyfWvQJigWSg">BILASIZMI?</a>
          `,
          parse_mode: 'HTML'
      })
    }
    else {
      bot.sendMessage(postB.from.id, 'YOU ARE NOT ADMIN!!!')
    }
})