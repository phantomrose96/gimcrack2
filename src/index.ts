import Discord from 'discord.js';
import { TOKEN } from './assets/token';
import * as callbacks from './functions';

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
  callbacks.onMessage(message);
});
