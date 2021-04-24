import Discord from 'discord.js';
import { functionMap } from './structs/Mappings';
import { TOKEN } from './strings/Token'; // ignored from git repo
import { initORM } from './database/Database';
import { onDead, onMourn } from './functions';
import { Actor } from './interfaces/Actor';
import {
  generateResponse,
  getResponsesByActor,
} from './functions/helpers/ResponsesHelpers';
import { DeadStrings, MournStrings } from './strings/Responses';

let ACTIVEACTOR = Actor.Slipshod;

const client = new Discord.Client();
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
  functionMap(getResponsesByActor(ACTIVEACTOR)).forEach((entry) => {
    entry.commands.forEach((command) => {
      if (message.content.startsWith(command)) {
        const rand = Math.random();
        message.content = message.content.substr(command.length + 1);
        ACTIVEACTOR === Actor.None
          ? onDead(message, generateResponse(DeadStrings))
          : ACTIVEACTOR === Actor.Slipshod && rand < 0.08
          ? onMourn(message, generateResponse(MournStrings))
          : entry.callback(
              message,
              generateResponse(entry.responses),
            );
      }
    });
  });
});
