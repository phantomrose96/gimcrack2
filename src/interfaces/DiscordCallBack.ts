import Discord from 'discord.js';

export type DiscordCallBack = (
  message: Discord.Message,
  response: string,
) => void | Promise<void>;
