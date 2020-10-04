import Discord from 'discord.js';
import { rootsite } from '../../assets/Mappings';
import { fetchPageContents } from '../HelperFunctions';

export function onFetchChapter(
  message: Discord.Message,
  response: string,
) {
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
        message.channel.send(response + '\n' + result);
      } else {
        message.channel.send(
          'Hey what do I look like, a fortune teller?',
        );
      }
    })
    .catch((err) => console.log(err));
}

async function fetchChapterLinkFromChapter(chapter: string) {
  const $ = await fetchPageContents();

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
