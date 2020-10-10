import { DiscordCallBack } from './DiscordCallBack';

export interface FunctionMapping {
  commands: string[];
  responses: string[];
  callback: DiscordCallBack;
}
