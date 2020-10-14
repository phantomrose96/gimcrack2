import { DiscordCallBack } from './DiscordCallBack';

interface Description {
  text: string;
  example: string;
}

export interface FunctionMapping {
  commands: string[];
  responses: string[];
  callback: DiscordCallBack;
  description: Description;
}
