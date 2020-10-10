import Discord from 'discord.js';
import { WheelIcons } from '../../assets/WheelIcons';
import {
  generateSpin,
  numberOfWins,
} from '../helpers/RouletteHelpers';

export function onSpin(message: Discord.Message, response: string) {
  const spin = generateSpin();

  message.channel.send(makeMessage(spin));
  const wins = numberOfWins(spin);
  message.channel.send(response + ' ' + wins);
}

function makeMessage(spin: number[]): string {
  let message = '';

  spin.forEach((val, ind) => {
    const icon = WheelIcons[val];
    message += ` ${icon}`;
    if (ind % 3 === 2) {
      message += ' \n';
    }
  });

  return message;
}
