import { Message } from './message';

export class SubscribeOptions {
  message: Message;
  callback?: (value: any) => void;
  error?: (error: any) => void;
  complete?: () => void;
}
