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
  if (wins === 0) {
    message.channel.send('Nothing! Sorry dude, tough break.');
    return;
  }
  message.channel.send(
    response +
      ' Heres your winnings: ' +
      wins +
      "x :sparkles: (Don't tell Ritsu)",
  );
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
