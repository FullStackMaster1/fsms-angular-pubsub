import { IMessage } from '../message';

export interface IHandleMessage<M extends IMessage> {
  handle({ message }: CallbackOptions<M>): void;
}

export interface MessageSubscription {
  unsubscribe();
}
export interface IMessageHandlerContext {
  publish<V extends IMessage = IMessage>(message: V): void;
}

export interface CallbackOptions<T extends IMessage> {
  message: T;
  context: IMessageHandlerContext;
}

export abstract class Logger {
  abstract error(message?: any, ...optionalParams: any[]): void;
  abstract log(message?: any, ...optionalParams: any[]): void;
  abstract warn(message?: any, ...optionalParams: any[]): void;
}
