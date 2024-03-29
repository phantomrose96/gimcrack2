import Discord from 'discord.js';
import { MakeAlters, MakeResponses } from '../../strings/Responses';

export async function onAsk(message: Discord.Message, response: string) {
  const newMessage = await message.channel.send(response);

  const altResponse = MakeAlters[response as MakeResponses];
  if (!altResponse || Math.random() > 0.4) {
    return;
  }

  setTimeout(() => {
    newMessage.edit(altResponse);
  }, 2000);
}
