import cheerio from 'cheerio';
import Discord from 'discord.js';
import fetch from 'node-fetch';
import * as responses from './assets/responses';
import { rootsite } from './assets/strings';

export function onMessage(message: Discord.Message) {
  if (message.content.includes('!chapter')) {
    onFetch(message);
  }

  if (message.content.includes('!ask')) {
    onAsk(message);
  }
}

export function onFetch(message: Discord.Message) {
  const chaptNum = message.content.match(/\d+/);
  if (!chaptNum) {
    message.channel.send(
      "Sorry, didn't catch a chapter number in that request",
    );
    return;
  }
  fetchChapterLink(chaptNum[0])
    .then((result) => {
      if (result !== '') {
        message.channel.send('Sure thing, bucko: ' + result);
      } else {
        message.channel.send(
          'Hey what do I look like, a fortune teller?',
        );
      }
    })
    .catch((err) => console.log(err));
}

export function onAsk(message: Discord.Message) {
  const index = Math.floor(
    Math.random() * responses.eightBall.length,
  );
  message.channel.send(responses.eightBall[index]);
}

export async function fetchChapterLink(chapter: string) {
  const response = await fetch(rootsite);
  const HTMLText = await response.text();

  return new Promise((resolve) => {
    const $ = cheerio.load(HTMLText);
    const category = $('option').filter(
      (_ind, element) =>
        element.firstChild &&
        element.firstChild.data === `${chapter}. Chapter ${chapter}`,
    );
    const chapSuffix = category[0] ? category[0].attribs.value : '';
    if (!chapSuffix) {
      resolve('');
    }
    resolve(rootsite + 'chapters/' + chapSuffix);
  });
}
