require('dotenv').config()
const SlackBot = require('slackbots');


var bot = new SlackBot({
    token: process.env.BOT_TOKEN,
    name: 'TL;DR'
});

bot.on('start', () => {
  bot.postMessageToChannel('testingtesting123', "We're up and running!")

  bot.on('message', (contents) => {
    console.log(contents);
  });
});
