import * as callbacks from '../functions/callbacks/index';
import * as responses from '../strings/Responses';
import { FunctionMapping } from '../interfaces/FunctionMap';

export const rootsite = 'https://archiveofourown.org/works/8472670';

export const functionMap: FunctionMapping[] = [
  {
    commands: ['!chapter'],
    responses: responses.onFetchChapterResponses,
    callback: callbacks.onFetchChapter,
    description: {
      text: 'fetches the Ao3 to a specified chapter',
      example: '!chapter 12',
    },
  },
  {
    commands: ['!ask'],
    responses: responses.onAskResponses,
    callback: callbacks.onAsk,
    description: {
      text: 'gives a magic 8 ball response to a yes or no question!',
      example: '!ask Will Mob get home?',
    },
  },
  {
    commands: ['!quote'],
    responses: responses.onFetchQuoteResponses,
    callback: callbacks.onFetchQuote,
    description: {
      text:
        'fetches a quote from ABoT. returns the paragraph of the first hit.',
      example: '!quote Today is different',
    },
  },
  {
    commands: ['!role', '!assign role', '!add role', '!assign'],
    responses: responses.onAssignRoleResponses,
    callback: callbacks.onAssignRole,
    description: {
      text: 'assigns a requested role',
      example: '!role she/her',
    },
  },
  {
    commands: ['!remove role', '!delete role', '!remove'],
    responses: responses.onRemoveRoleResponses,
    callback: callbacks.onRemoveRole,
    description: {
      text: 'removes a requested role',
      example: '!remove any/pronouns',
    },
  },
  {
    commands: ['!spin', '!gamble'],
    responses: responses.onSpinResponses,
    callback: callbacks.onSpin,
    description: {
      text:
        'spins the roulette wheel! will use a bet of 1x:sparkles: unless specified.',
      example: '!spin 5',
    },
  },
  {
    commands: ['!balance'],
    responses: responses.onBalanceResponses,
    callback: callbacks.onBalance,
    description: {
      text: 'tells you your balance of :sparkles:.',
      example: '!balance',
    },
  },
  {
    commands: ['!dailies'],
    responses: responses.onDailiesResponses,
    callback: callbacks.onDailies,
    description: {
      text: 'increases your account by 50x:sparkles: once per day.',
      example: '!dailies',
    },
  },
  {
    commands: ['!help'],
    responses: responses.onHelpResponses,
    callback: callbacks.onHelp,
    description: {
      text: 'sends you a DM with all functions and uses.',
      example: '!help',
    },
  },
];
