import { Type } from '@angular/core';
import { IMessage } from './message';

/**
 * Configures an pubsub created by `createPubsub`.
 */
export interface PubsubConfig {
  /**
   * List of messages to subscribe.
   */
  messages: Type<IMessage>[];
  /**
   * Determines if the pubsub will tracing messages or not.
   */
  useTracing?: boolean;
}

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

export interface PubsubSubscription {
  unsubscribe(): void;
}
