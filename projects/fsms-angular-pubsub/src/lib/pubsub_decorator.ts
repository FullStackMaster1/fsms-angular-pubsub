
 
import { getSourceForInstance } from './utils';

const METADATA_KEY = '__@fsms/pubsubs__';


export function MessageHandler(config: PubsubConfig = {}) {
  return <T extends Object, K extends EffectPropertyKey<T>>(target: T,
                                                            propertyName: K) => {
    const metadata: EffectMetadata<T> = {
      ...DEFAULT_EFFECT_CONFIG,
      ...config,
      propertyName,
    };
    addEffectMetadataEntry<T>(target, metadata);
  };
}

export function getEffectDecoratorMetadata<T>(
  instance: T
): EffectMetadata<T>[] {
  const effectsDecorators: EffectMetadata<T>[] = compose(
    getEffectMetadataEntries,
    getSourceForInstance
  )(instance);

  return effectsDecorators;
}

/**
 * Type guard to detemine whether METADATA_KEY is already present on the Class
 * constructor
 */
function hasMetadataEntries<T extends Object>(
  sourceProto: T
): sourceProto is typeof sourceProto & {
  constructor: typeof sourceProto.constructor & {
    [METADATA_KEY]: EffectMetadata<T>[];
  };
} {
  return sourceProto.constructor.hasOwnProperty(METADATA_KEY);
}

/** Add Effect Metadata to the Effect Class constructor under specific key */
function addEffectMetadataEntry<T extends object>(
  sourceProto: T,
  metadata: EffectMetadata<T>
) {
  if (hasMetadataEntries(sourceProto)) {
    sourceProto.constructor[METADATA_KEY].push(metadata);
  } else {
    Object.defineProperty(sourceProto.constructor, METADATA_KEY, {
      value: [metadata],
    });
  }
}

function getEffectMetadataEntries<T extends object>(
  sourceProto: T
): EffectMetadata<T>[] {
  return hasMetadataEntries(sourceProto)
    ? sourceProto.constructor[METADATA_KEY]
    : [];
}
