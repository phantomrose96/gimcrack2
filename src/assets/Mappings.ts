import * as callbacks from '../functions/callbacks/index';
import * as responses from './responses';
import { FunctionMapping } from '../interfaces/FunctionMap';

export const rootsite = 'https://archiveofourown.org/works/8472670';

export const functionMap: FunctionMapping[] = [
  {
    command: '!chapter',
    responses: responses.onFetchChapterResponses,
    callback: callbacks.onFetchChapter,
  },
  {
    command: '!ask',
    responses: responses.onAskResponses,
    callback: callbacks.onAsk,
  },
  {
    command: '!quote',
    responses: responses.onFetchQuoteResponses,
    callback: callbacks.onFetchQuote,
  },
  {
    command: '!assign role',
    responses: responses.onAssignRoleResponses,
    callback: callbacks.onAssignRole,
  },
  {
    command: '!remove role',
    responses: responses.onRemoveRoleResponses,
    callback: callbacks.onRemoveRole,
  },
];
