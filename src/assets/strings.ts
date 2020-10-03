import * as callbacks from '../functions';
import { FunctionMapping } from '../interfaces/FunctionMap';

export const rootsite = 'https://archiveofourown.org/works/8472670';

export const functionMap: FunctionMapping[] = [
  { command: '!chapter', callback: callbacks.onFetchChapter },
  { command: '!ask', callback: callbacks.onAsk },
  { command: '!quote', callback: callbacks.onFetchQuote },
];
