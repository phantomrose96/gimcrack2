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
  const findBet = message.content.match(/\d+/);
  const bet = findBet ? ((findBet[0] as unknown) as number) : 1;
  const betMultiplier = bet * 2;

  const account = await checkAndCreateAccount(message.author.id);
  if (!account) {
    return;
  }

  const currentBalance = await getBalance(account);
  if (currentBalance < bet) {
    message.channel.send(
      `Woah there! That's way too steep a bet. You can't gamble away more than your life force.`,
    );
    return;
  }

  message.channel.send(
    `Thanks, I'll be taking that: -${bet} :sparkles: \nCurrent balance: x${
      currentBalance - bet
    } :sparkles:\n`,
  );

  const spin = generateSpin();
  message.channel.send(makeMessage(spin));
  const wins = numberOfWins(spin);
  const payout = wins * betMultiplier;
  const netChange = payout - bet;
  const balance = await updateBalance(account, netChange);

  if (wins === 0) {
    message.channel.send('Nothing! Sorry dude, tough break.');
    return;
  }

  let reply = `${response}`;
  reply +=
    betMultiplier !== 0
      ? `Heres your payout: ${payout}x :sparkles:\n`
      : `Of course, you didn't bet anything. No payout for you.\n`;
  reply += `Current Balance: ${balance}x :sparkles:`;
  message.channel.send(reply);
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
