import * as callbacks from '../functions/callbacks/index';
import { FunctionMapping } from '../interfaces/FunctionMap';
import { IResponses } from '../interfaces/Responses';

export const rootsite = 'https://archiveofourown.org/works/8472670';

export function functionMap(actor: IResponses): FunctionMapping[] {
  return [
    {
      commands: ['!chapter'],
      responses: actor.onFetchChapterResponses,
      callback: callbacks.onFetchChapter,
      description: {
        text: 'fetches the Ao3 to a specified chapter',
        example: '!chapter 12',
      },
    },
    {
      commands: ['!ask'],
      responses: actor.onAskResponses,
      callback: callbacks.onAsk,
      description: {
        text:
          'gives a magic 8 ball response to a yes or no question!',
        example: '!ask Will Mob get home?',
      },
    },
    {
      commands: ['!quote'],
      responses: actor.onFetchQuoteResponses,
      callback: callbacks.onFetchQuote,
      description: {
        text:
          'fetches a quote from ABoT. returns the paragraph of the first hit.',
        example: '!quote Today is different',
      },
    },
    {
      commands: [
        '!role',
        '!assign role',
        '!add role',
        '!assign',
        '!add',
      ],
      responses: actor.onAssignRoleResponses,
      callback: callbacks.onAssignRole,
      description: {
        text: 'assigns a requested role',
        example: '!role she/her',
      },
    },
    {
      commands: ['!remove role', '!delete role', '!remove'],
      responses: actor.onRemoveRoleResponses,
      callback: callbacks.onRemoveRole,
      description: {
        text: 'removes a requested role',
        example: '!remove any/pronouns',
      },
    },
    {
      commands: ['!spin', '!gamble'],
      responses: actor.onSpinResponses,
      callback: callbacks.onSpin,
      description: {
        text:
          'spins the roulette wheel! will use a bet of 1x:sparkles: unless specified.',
        example: '!spin 5',
      },
    },
    {
      commands: ['!balance'],
      responses: actor.onBalanceResponses,
      callback: callbacks.onBalance,
      description: {
        text: 'tells you your balance of :sparkles:.',
        example: '!balance',
      },
    },
    {
      commands: ['!dailies'],
      responses: actor.onDailiesResponses,
      callback: callbacks.onDailies,
      description: {
        text: 'increases your account by 50x:sparkles: once per day.',
        example: '!dailies',
      },
    },
    {
      commands: ['!help'],
      responses: actor.onHelpResponses,
      callback: callbacks.onHelp,
      description: {
        text: 'sends you a DM with all functions and uses.',
        example: '!help',
      },
    },
  ];
}
