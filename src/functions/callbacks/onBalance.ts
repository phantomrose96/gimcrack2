import Discord from 'discord.js';
import {
  checkAndCreateAccount,
  getBalance,
} from '../dbhandlers/dbHandlers';

export async function onBalance(
  message: Discord.Message,
  response: string,
) {
  const account = await checkAndCreateAccount(message.author.id);
  if (!account) {
    return;
  }
  const balance = await getBalance(account);
  message.channel.send(response + ': x' + balance + ' :sparkles:');
}
