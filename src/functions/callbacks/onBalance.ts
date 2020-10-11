import Discord from 'discord.js';
import {
  checkAndCreateAccount,
  getBalance,
} from '../dbhandlers/dbHandlers';

export async function onBalance(
  message: Discord.Message,
  response: string,
) {
  const checkAccount = await checkAndCreateAccount(message.author.id);
  if (!checkAccount) {
    return;
  }
  const balance = await getBalance(message.author.id);
  message.channel.send(response + ': x' + balance + ' :sparkle:');
}
