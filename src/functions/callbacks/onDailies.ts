import Discord from 'discord.js';
import { checkAndCreateAccount, updateDailies } from '../dbhandlers/dbHandlers';

export async function onDailies(message: Discord.Message, response: string) {
  const account = await checkAndCreateAccount(message.author.id);
  if (!account) {
    return;
  }
  const dailiesResponse = await updateDailies(account);
  if (dailiesResponse < 0) {
    message.channel.send(
      `Greedy. You're on cooldown for another ${Math.floor(
        -dailiesResponse,
      )} hours`,
    );
  } else {
    message.channel.send(
      response + ': x50\nCurrent Balance: ' + dailiesResponse + ' :sparkles:',
    );
  }
}
