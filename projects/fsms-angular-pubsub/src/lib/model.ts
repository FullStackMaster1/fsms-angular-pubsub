import { Type } from '@angular/core';
import { Message } from './message';

/**
 * Configures an pubsub created by `createPubsub`.
 */
export interface PubsubConfig {
  /**
   * List of messages to subscribe.
   */
  messages?: Type<Message>[];
  /**
   * Determines if the pubsub will be resubscribed to if an error occurs in the main actions stream.
   */
  usePubsubsErrorHandler?: boolean;
}

export const DEFAULT_EFFECT_CONFIG: Readonly<Required<PubsubConfig>> = {
  messages: [],
  usePubsubsErrorHandler: true,
};

export interface PubsubMetadata<T extends Object>
  extends Required<PubsubConfig> {
  propertyName: PubsubPropertyKey<T>;
}

export type PubsubPropertyKey<T extends Object> = Exclude<
  keyof T,
  keyof Object
>;
