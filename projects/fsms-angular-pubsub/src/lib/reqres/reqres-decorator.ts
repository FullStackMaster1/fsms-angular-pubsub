// tslint:disable: ban-types

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
