import Discord from 'discord.js';
import { ABoT } from '../../assets/ABoT';

export function onFetchQuote(
  message: Discord.Message,
  response: string,
) {
  message.content = message.content.toLocaleLowerCase();
  let foundQuote: string | undefined;

  ABoT.find((chapter) => {
    foundQuote = chapter.content.find((paragraph) => {
      let cleanedParagraph = paragraph
        .toLocaleLowerCase()
        .replace(/’/g, "'");
      return cleanedParagraph.includes(message.content);
    });
    return !!foundQuote;
  });

  if (!!foundQuote) {
    message.channel.send(response + '```' + foundQuote + '```');
  } else {
    message.channel.send("Sorry, can't find that quote");
  }
}
