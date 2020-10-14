import Discord from 'discord.js';
import { functionMap } from '../../structs/Mappings';

export async function onHelp(
  message: Discord.Message,
  response: string,
) {
  let reply = response + '\n\n';
  functionMap.forEach((func) => {
    reply += 'command: `' + func.commands.toString() + '`\n';
    reply += 'description: `' + func.description.text + '`\n';
    reply += '```Ex: ' + func.description.example + '\n```\n';
  });

  let dmChannel = message.author.dmChannel;
  if (!dmChannel) {
    dmChannel = await message.author.createDM();
  }
  dmChannel.send(reply);
}
