import Discord from 'discord.js';
import { WheelIcons } from '../../strings/WheelIcons';
import {
  checkAndCreateAccount,
	getBalance,
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
  const findMultiplier = message.content.match(/\d+/);
  const multiplier = findMultiplier ? (findMultiplier[0] as unknown) as number: 1;

  const checkAccount = await checkAndCreateAccount(message.author.id);
  if (!checkAccount) {
    return;
  }

  const currentBalance = await getBalance(message.author.id);
  if(currentBalance < multiplier) {
	message.channel.send(
		`Woah there! That's way too steep a bet. You can't gamble away more than your life force.`,
	  );
	return;
  }

  let balance = await updateBalance(message.author.id, -multiplier);
  message.channel.send(
    `Thanks, I'll be taking that: -${multiplier} :sparkles: \nCurrent balance: x${balance} :sparkles:\n`,
  );

  const spin = generateSpin();
  message.channel.send(makeMessage(spin));
  const wins = numberOfWins(spin)*multiplier;
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
  let message = '>\n>';

  spin.forEach((val, ind) => {
    const icon = WheelIcons[val];
    message += ` ${icon}`;
    if (ind % 3 === 2) {
      message += ' \n>';
    }
  });

  return message;
}
