import Discord from 'discord.js';

export function onAsk(message: Discord.Message, response: string) {
  message.channel.send(response);
}
