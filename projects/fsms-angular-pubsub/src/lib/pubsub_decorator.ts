import {
  DEFAULT_PUBSUB_CONFIG,
  PubsubConfig,
  PubsubMetadata,
  PubsubPropertyKey,
} from './model';
import { getSourceForInstance } from './utils';

const METADATA_KEY = '__@fsms/pubsubs__';

export function MessageHandler(config: PubsubConfig = {}) {
  debugger;
  return (constructor: any) => {
    debugger;
    console.log("Logging: "+ constructor.prototype);
  };
  // return <T extends Object, K extends PubsubPropertyKey<T>>(
  //   target: T,
  //   propertyName: K
  // ) => {
  //   const metadata: PubsubMetadata<T> = {
  //     ...DEFAULT_PUBSUB_CONFIG,
  //     ...config,
  //     propertyName,
  //   };
  //   addPubsubMetadataEntry<T>(target, metadata);
  // };
}

export function getPubsubDecoratorMetadata<T>(
  instance: T
): PubsubMetadata<T>[] {
  // const effectsDecorators: PubsubMetadata<T>[] = compose(
  //   getPubsubMetadataEntries,
  //   getSourceForInstance
  // )(instance);

  return [];

  // return effectsDecorators;
}

/**
 * Type guard to detemine whether METADATA_KEY is already present on the Class
 * constructor
 */
function hasMetadataEntries<T extends Object>(
  sourceProto: T
): sourceProto is typeof sourceProto & {
  constructor: typeof sourceProto.constructor & {
    [METADATA_KEY]: PubsubMetadata<T>[];
  };
} {
  return sourceProto.constructor.hasOwnProperty(METADATA_KEY);
}

/** Add Pubsub Metadata to the Pubsub Class constructor under specific key */
function addPubsubMetadataEntry<T extends object>(
  sourceProto: T,
  metadata: PubsubMetadata<T>
) {
  if (hasMetadataEntries(sourceProto)) {
    sourceProto.constructor[METADATA_KEY].push(metadata);
  } else {
    Object.defineProperty(sourceProto.constructor, METADATA_KEY, {
      value: [metadata],
    });
  }
}

function getPubsubMetadataEntries<T extends object>(
  sourceProto: T
): PubsubMetadata<T>[] {
  return hasMetadataEntries(sourceProto)
    ? sourceProto.constructor[METADATA_KEY]
    : [];
}
