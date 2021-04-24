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
      `Huehue that'd kill you if you bet that much.`,
    );
    return;
  }

  message.channel.send(
    `Thanks, huehuehue -${bet} :sparkles: \nCurrent balance: x${
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
    message.channel.send("Oof that's a tough break.");
    return;
  }

  let reply = `${response}`;
  reply +=
    betMultiplier !== 0
      ? `Payout! ${payout}x :sparkles:\n`
      : `You didn't bet nothing. No payout for you.\n`;
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
