import Discord from 'discord.js';
import { functionMap } from './assets/strings';
import { TOKEN } from './assets/token';

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
    if (message.content.includes(entry.command)) {
      entry.callback(message);
    }
  });
});
