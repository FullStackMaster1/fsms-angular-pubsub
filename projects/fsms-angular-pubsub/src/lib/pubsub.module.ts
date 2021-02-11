import { Injector, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { PubsubService } from './pubsub.service';
import { PubsubFeatureModule } from './pubsub_feature_module';
import { PubsubRootModule } from './pubsub_root_module';
import {
  FEATURE_PUBSUBS,
  PUBSUB_ERROR_HANDLER,
  ROOT_PUBSUBS,
  USER_PROVIDED_PUBSUBS,
  _FEATURE_PUBSUBS,
  _ROOT_PUBSUBS,
} from './tokens';

@NgModule()
export class PubSubModule {
  static forFeature(
    featurePubsubs: Type<any>[] = []
  ): ModuleWithProviders<PubsubFeatureModule> {
    return {
      ngModule: PubsubFeatureModule,
      providers: [
        featurePubsubs,
        {
          provide: _FEATURE_PUBSUBS,
          multi: true,
          useValue: featurePubsubs,
        },
        {
          provide: USER_PROVIDED_PUBSUBS,
          multi: true,
          useValue: [],
        },
        {
          provide: FEATURE_PUBSUBS,
          multi: true,
          useFactory: createPubsubs,
          deps: [Injector, _FEATURE_PUBSUBS, USER_PROVIDED_PUBSUBS],
        },
      ],
    };
  }

  static forRoot(
    rootPubsubs: Type<any>[] = []
  ): ModuleWithProviders<PubsubRootModule> {
    return {
      ngModule: PubsubRootModule,
      providers: [
        rootPubsubs,
        {
          provide: _ROOT_PUBSUBS,
          useValue: [rootPubsubs],
        },
        PubsubService,
        {
          provide: USER_PROVIDED_PUBSUBS,
          multi: true,
          useValue: [],
        },
        {
          provide: ROOT_PUBSUBS,
          useFactory: createPubsubs,
          deps: [Injector, _ROOT_PUBSUBS, USER_PROVIDED_PUBSUBS],
        },
      ],
    };
  }
}

export function createPubsubs(
  injector: Injector,
  pubsubGroups: Type<any>[][],
  userProvidedEffectGroups: Type<any>[][]
): any[] {
  const mergedPubsubs: Type<any>[] = [];

  for (const pubsubGroup of pubsubGroups) {
    mergedPubsubs.push(...pubsubGroup);
  }

  for (const userProvidedPubsubsGroup of userProvidedEffectGroups) {
    mergedPubsubs.push(...userProvidedPubsubsGroup);
  }

  return createPubsubInstances(injector, mergedPubsubs);
}

export function createPubsubInstances(
  injector: Injector,
  pubsubs: Type<any>[]
): any[] {
  return pubsubs.map((pubsub) => injector.get(pubsub));
}
