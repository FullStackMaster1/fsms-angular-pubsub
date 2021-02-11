// tslint:disable: ban-types
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

export const DEFAULT_PUBSUB_CONFIG: Readonly<Required<PubsubConfig>> = {
  messages: [],
  useTracing: true,
};
