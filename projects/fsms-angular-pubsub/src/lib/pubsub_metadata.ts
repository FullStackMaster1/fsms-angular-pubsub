import { PubsubMetadata } from './model';
import { METADATA_KEY } from './pubsub_root_module';
import { getSourceForInstance } from './utils';

export function getPubsubDecoratorMetadata<T>(
  instance: T
): PubsubMetadata<T>[] {
  const y = getSourceForInstance(instance);
  return y.constructor[METADATA_KEY];
}
