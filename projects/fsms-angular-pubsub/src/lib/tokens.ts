import { InjectionToken, Type } from '@angular/core';

export const _ROOT_PUBSUBS_GUARD = new InjectionToken<void>(
  '@fsms/pubsub Internal Root Guard'
);
export const USER_PROVIDED_PUBSUBS = new InjectionToken<Type<any>[][]>(
  '@fsms/pubsub User Provided PubSub'
);
export const _ROOT_PUBSUBS = new InjectionToken<Type<any>[]>(
  '@fsms/pubsub Internal Root PubSub'
);
export const ROOT_PUBSUBS = new InjectionToken<Type<any>[]>(
  '@fsms/pubsub Root PubSub'
);
export const _FEATURE_PUBSUBS = new InjectionToken<Type<any>[]>(
  '@fsms/pubsub Internal Feature PubSub'
);
export const FEATURE_PUBSUBS = new InjectionToken<any[][]>(
  '@fsms/pubsub Feature PubSub'
);

export const METADATA_KEY = '__@fsms/pubsub__';
