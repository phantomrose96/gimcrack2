import cheerio from 'cheerio';
import Discord from 'discord.js';
import fetch from 'node-fetch';
import * as responses from './assets/responses';
import { rootsite } from './assets/strings';

export function onFetchChapter(message: Discord.Message) {
  const chaptNum = message.content.match(/\d+/);
  if (!chaptNum) {
    message.channel.send(
      "Sorry, didn't catch a chapter number in that request",
    );
    return;
  }
  fetchChapterLinkFromChapter(chaptNum[0])
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

export async function onFetchQuote(message: Discord.Message) {
  message.content = message.content.toLocaleLowerCase();
  const $ = await fetchPageContents(true);
  console.log(message);

  const div = $('p').filter((_ind, element) => {
    const children = element.childNodes.filter((child) => {
      let lowerCase = child.data?.toLocaleLowerCase();
      lowerCase = lowerCase?.replace(/’/g, "'");
      return lowerCase?.includes(message.content);
    });
    return children.length;
  });

  if (!!div && !!div[0]) {
    message.channel.send(
      'Here ya go:```' + joinParagraph(div[0].children) + '```',
    );
  } else {
    message.channel.send("Sorry, can't find that quote");
  }
}

export function onAsk(message: Discord.Message) {
  const index = Math.floor(
    Math.random() * responses.eightBall.length,
  );
  message.channel.send(responses.eightBall[index]);
}

function joinParagraph(children: cheerio.Element[]): string {
  let st = '';
  children.forEach((child) => {
    st += child.data ? child.data : child.firstChild.data;
  });

  return st;
}

async function fetchChapterLinkFromChapter(chapter: string) {
  const $ = await fetchPageContents(true);

  return new Promise((resolve) => {
    const category = $('option').filter(
      (_ind, element) =>
        element.firstChild &&
        element.firstChild.data === `${chapter}. Chapter ${chapter}`,
    );
    const chapSuffix = category[0] ? category[0].attribs.value : '';
    if (!chapSuffix) {
      resolve('');
    }
    resolve(rootsite + '/chapters/' + chapSuffix);
  });
}

async function fetchPageContents(
  fullwork?: boolean,
): Promise<cheerio.Root> {
  const URL: string =
    rootsite + (fullwork ? '?view_full_work=true/' : '/');
  const response = await fetch(URL);
  const HTMLText = await response.text();

  return new Promise((resolve) => {
    resolve(cheerio.load(HTMLText));
  });
}
