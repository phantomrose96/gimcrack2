import Discord from 'discord.js';
import { functionMap } from './structs/Mappings';
import { ActorToken, TOKENS } from './strings/Token'; // ignored from git repo
import { initORM } from './database/Database';
import { onMourn } from './functions';
import { Actor } from './interfaces/Actor';
import {
  actorResponseRange,
  generateResponse,
  getResponsesByActor,
} from './functions/helpers/ResponsesHelpers';
import { DeadStrings } from './strings/Responses';

Object.values(TOKENS)
  .filter((val) => val.actor !== Actor.None)
  .forEach((val) => login(val));

function login(val: ActorToken) {
  const client = new Discord.Client();
  client.login(val.token).catch((err) => console.error(err));
  const ACTIVEACTOR = val.actor;

  client.on('ready', () => {
    if (!client.user) {
      console.error('Failed to log in.');
      return;
    }
    if (val.actor === Actor.Makeshift) {
      // only Makeshift should have the database
      initORM();
    } else {
      // make all others invisible
      client.user.setStatus('invisible');
    }
    console.log('logged in as ' + client.user.tag);
  });

  client.on('message', (message) => {
    if (!actorResponseRange(val.actor, message.createdTimestamp)) {
      return;
    }
    functionMap(getResponsesByActor(ACTIVEACTOR)).forEach((entry) => {
      entry.commands.forEach((command) => {
        if (message.content.startsWith(command)) {
          message.content = message.content.substr(command.length + 1);
          ACTIVEACTOR !== Actor.Makeshift
            ? onMourn(message, generateResponse(DeadStrings))
            : entry.callback(message, generateResponse(entry.responses));
        }
      });
    });
  });
}
