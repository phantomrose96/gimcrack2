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
  let balance = await updateBalance(message.author.id, -1);
  message.channel.send(
    `Thanks, I'll be taking that: :sparkles: x1\n Current balance: x${balance} :sparkles:\n`,
  );

  const spin = generateSpin();
  message.channel.send(makeMessage(spin));
  const wins = numberOfWins(spin);
  if (wins === 0) {
    message.channel.send('Nothing! Sorry dude, tough break.');
    return;
  }
  balance = await updateBalance(message.author.id, wins);

  message.channel.send(
    `${response} Heres your winnings: ${wins}x :sparkles:\n Current Balance: ${balance}x :sparkles:`,
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
