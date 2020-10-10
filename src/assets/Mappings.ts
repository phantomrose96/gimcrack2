import * as callbacks from '../functions/callbacks/index';
import * as responses from './responses';
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
    commands: ['!assign role', '!add role', '!assign'],
    responses: responses.onAssignRoleResponses,
    callback: callbacks.onAssignRole,
  },
  {
    commands: ['!remove role', '!delete role'],
    responses: responses.onRemoveRoleResponses,
    callback: callbacks.onRemoveRole,
  },
];
