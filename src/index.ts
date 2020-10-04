import Discord from 'discord.js';
import { generateResponse } from './assets/responses';
import { functionMap } from './assets/Mappings';
import { TOKEN } from './assets/Token'; // ignored from git repo

const client = new Discord.Client();

if (TOKEN) {
  client.login(TOKEN).catch(console.error);
}

client.on('ready', () => {
  if (!client.user) {
    console.error('Failed to log in.');
    return;
  }
  console.log('logged in as ' + client.user.tag);
});

client.on('message', (message) => {
  functionMap.forEach((entry) => {
    if (message.content.startsWith(entry.command)) {
      message.content = message.content.substr(
        entry.command.length + 1,
      );
      entry.callback(message, generateResponse(entry.responses));
    }
  });
});
