import * as callbacks from '../functions/callbacks/index';
import * as responses from './Responses';
import { FunctionMapping } from '../interfaces/FunctionMap';

export const rootsite = 'https://archiveofourown.org/works/8472670';

export const functionMap: FunctionMapping[] = [
  {
    commands: ['!chapter'],
    responses: responses.onFetchChapterResponses,
    callback: callbacks.onFetchChapter,
  },
  {
    commands: ['!ask'],
    responses: responses.onAskResponses,
    callback: callbacks.onAsk,
  },
  {
    commands: ['!quote'],
    responses: responses.onFetchQuoteResponses,
    callback: callbacks.onFetchQuote,
  },
  {
    commands: ['!role', '!assign role', '!add role', '!assign'],
    responses: responses.onAssignRoleResponses,
    callback: callbacks.onAssignRole,
  },
  {
    commands: ['!remove role', '!delete role'],
    responses: responses.onRemoveRoleResponses,
    callback: callbacks.onRemoveRole,
  },
  {
    commands: ['!spin', '!gamble'],
    responses: responses.onSpinResponses,
    callback: callbacks.onSpin,
  },
  {
    commands: ['!balance'],
    responses: responses.onBalanceResponses,
    callback: callbacks.onBalance,
  },
  {
    commands: ['!dailies'],
    responses: responses.onDailiesResponses,
    callback: callbacks.onDailies,
  },
];
