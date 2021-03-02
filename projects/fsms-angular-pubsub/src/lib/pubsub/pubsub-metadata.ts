
import { METADATA_KEY } from './pubsub-tokens';
import { getSourceForInstance } from '../utils';
import { PubsubConfig } from '../contracts/pubsub-definitions';

export function getPubsubDecoratorMetadata<T>(instance: T): PubsubConfig {
  const y = getSourceForInstance(instance);
  return y.constructor[METADATA_KEY];
}
