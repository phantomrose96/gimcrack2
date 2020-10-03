import { DiscordCallBack } from './DiscordCallBack';

export interface FunctionMapping {
  command: string;
  callback: DiscordCallBack;
}
