import Discord from 'discord.js';
import { ABoT } from '../../structs/ABoT';

export function onFetchChapter(
  message: Discord.Message,
  response: string,
) {
  const chaptNum = message.content.match(/\d+/);
  if (!chaptNum) {
    message.channel.send('What chapter?');
    return;
  }
  const chapterNumber = (chaptNum[0] as unknown) as number;

  if (chapterNumber > ABoT.length) {
    message.channel.send("I can't tell the future");
    return;
  }

  message.channel.send(
    response + '\n' + ABoT[chapterNumber - 1].hyperlink,
  );
}
