const pry = require('pryjs');

require('dotenv').config()
const SlackBot = require('slackbots');
const RestClient = require('node-rest-client').Client;
const client = new RestClient();

var bot = new SlackBot({
    token: process.env.BOT_TOKEN,
    name: 'TL;DR'
});

bot.on('start', () => {
  bot.postMessageToChannel('testingtesting123', "We're up and running!")

  bot.on('message', (contents) => {
    if (contents.type === 'message' && contents.text.length > 1000) {
      let channel = contents.channel;

      let fullText = {
                      "title": "",
                      "text": contents.text
                     };

      let args = {
        data: {
          'summary_length': Math.floor(contents.text.length / 500),
          'articles': [fullText]
        },
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': process.env.AGOLO_TOKEN
        }
      };

      console.log("We're going to have to summarize this one...");

      client.post('https://api.agolo.com/nlp/v0.2/summarize', args, function(data) {
        let summary = data.summary[0].sentences.join(' ');
        bot.postMessage(channel, summary);
      });
    }

  });
});
