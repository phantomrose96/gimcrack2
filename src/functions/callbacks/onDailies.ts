import Discord from 'discord.js';
import {
  checkAndCreateAccount,
  updateDailies,
} from '../dbhandlers/dbHandlers';

export async function onDailies(
  message: Discord.Message,
  response: string,
) {
  const checkAccount = await checkAndCreateAccount(message.author.id);
  if (!checkAccount) {
    return;
  }
  const dailiesResponse = await updateDailies(message.author.id);
  if (dailiesResponse < 0) {
    message.channel.send(
      `Sorry, you're on cooldown for another ${Math.floor(
        -dailiesResponse,
      )} hours`,
    );
  } else {
    message.channel.send(
      response + ': x' + dailiesResponse + ' :sparkles:',
    );
  }
}
