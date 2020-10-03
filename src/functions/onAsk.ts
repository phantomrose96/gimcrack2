import Discord from 'discord.js';
import * as responses from '../assets/Responses';

export function onAsk(message: Discord.Message) {
  const index = Math.floor(
    Math.random() * responses.eightBall.length,
  );
  message.channel.send(responses.eightBall[index]);
}
