// tslint:disable: ban-types
import { PubsubConfig } from '../contracts/pubsub-definitions';
import { DEFAULT_PUBSUB_CONFIG } from './model';
import { METADATA_KEY } from './pubsub-tokens';

export function RegisterHandler(config: PubsubConfig): ClassDecorator {
  return <T extends Object>(target: T) => {
    const metadata: PubsubConfig = {
      ...DEFAULT_PUBSUB_CONFIG,
      ...config,
    };
    Object.defineProperty(target, METADATA_KEY, {
      value: metadata,
    });
  };
}
