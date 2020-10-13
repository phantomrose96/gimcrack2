import Discord from 'discord.js';
import { generateResponse } from './strings/responses';
import { functionMap } from './strings/Mappings';
import { initORM } from './database/Database';

const client = new Discord.Client();
const TOKEN: string = process.env.GimcrackToken || '';
if (TOKEN) {
  client.login(TOKEN).catch((err) => console.error(err));
}

client.on('ready', () => {
  if (!client.user) {
    console.error('Failed to log in.');
    return;
  }
  initORM();
  console.log('logged in as ' + client.user.tag);
});

client.on('message', (message) => {
  functionMap.forEach((entry) => {
    entry.commands.forEach((command) => {
      if (message.content.startsWith(command)) {
        message.content = message.content.substr(command.length + 1);
        entry.callback(message, generateResponse(entry.responses));
      }
    });
  });
});
