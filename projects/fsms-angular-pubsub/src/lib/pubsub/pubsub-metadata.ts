import { PubsubConfig } from './model';
import { METADATA_KEY } from './pubsub-tokens';
import { getSourceForInstance } from '../utils';

export function getPubsubDecoratorMetadata<T>(instance: T): PubsubConfig {
  const y = getSourceForInstance(instance);
  return y.constructor[METADATA_KEY];
}
