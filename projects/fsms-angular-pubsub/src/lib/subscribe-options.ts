import { Message } from './message';

export interface SubscribeOptions {
  messageType: string;
  callback: (value: any) => void;
  error?: (error: any) => void;
  complete?: () => void;
}
