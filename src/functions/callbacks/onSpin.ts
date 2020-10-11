import Discord from 'discord.js';
import { WheelIcons } from '../../strings/WheelIcons';
import {
  checkAndCreateAccount,
  updateBalance,
} from '../dbhandlers/dbHandlers';
import {
  generateSpin,
  numberOfWins,
} from '../helpers/RouletteHelpers';

export async function onSpin(
  message: Discord.Message,
  response: string,
) {
  const checkAccount = await checkAndCreateAccount(message.author.id);
  if (!checkAccount) {
    return;
  }
  await updateBalance(message.author.id, -1);
  message.channel.send('Thanks, I]ll be taking that: :sparkle: x1');

  const spin = generateSpin();
  message.channel.send(makeMessage(spin));
  const wins = numberOfWins(spin);
  if (wins === 0) {
    message.channel.send('Nothing! Sorry dude, tough break.');
    return;
  }
  message.channel.send(
    response + ' Heres your winnings: ' + wins + 'x :sparkles:',
  );
  await updateBalance(message.author.id, wins);
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
