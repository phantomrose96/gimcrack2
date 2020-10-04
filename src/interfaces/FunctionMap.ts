import { DiscordCallBack } from './DiscordCallBack';

export interface FunctionMapping {
  command: string;
  responses: string[];
  callback: DiscordCallBack;
}
