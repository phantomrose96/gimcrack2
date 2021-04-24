import Discord from 'discord.js';

export async function onMourn(
  message: Discord.Message,
  response: string,
) {
  message.channel.send(response);
}
