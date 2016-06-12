const SlackBot = require('slackbots');

var bot = new SlackBot({
    token: process.env.BOT_TOKEN,
    name: 'TL;DR'
});

bot.on('start', () => {
  bot.postMessageToChannel('')
})
