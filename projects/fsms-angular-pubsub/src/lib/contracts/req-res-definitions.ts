import { Type } from '@angular/core';
import { IMessage } from '@fsms/angular-pubsub';

/**
 * Configures an pubsub created by `createReqRes`.
 */
export interface ReqResConfig {
  /**
   * List of messages to subscribe.
   */
  messages: Type<IMessage>[];
  /**
   * Determines if the pubsub will tracing messages or not.
   */
  useTracing?: boolean;
}
