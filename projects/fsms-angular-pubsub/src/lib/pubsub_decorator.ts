// tslint:disable: ban-types
import { DEFAULT_PUBSUB_CONFIG, PubsubMetadata } from './model';

const METADATA_KEY = '__@fsms/pubsubs__';

export function RegisterHandler(config: any): ClassDecorator {
  return <T extends Object>(target: T) => {
    const metadata: PubsubMetadata<T> = {
      ...DEFAULT_PUBSUB_CONFIG,
      ...config,
    };
    Object.defineProperty(target, METADATA_KEY, {
      value: metadata,
    });
  };
}
