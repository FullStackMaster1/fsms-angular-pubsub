// tslint:disable: ban-types

import { PubsubConfig } from '../contracts/pubsub-definitions';

export const DEFAULT_PUBSUB_CONFIG: Readonly<Required<PubsubConfig>> = {
  messages: [],
  useTracing: true,
};
