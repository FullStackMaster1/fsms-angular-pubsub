import { Injector, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { DEFAULT_PUBSUB_CONFIG, PubsubMetadata } from './model';
import { PubsubService } from './pubsub.service';
import { defaultPubsubsErrorHandler } from './pubsub_error_handler';
import { METADATA_KEY, PubsubRootModule } from './pubsub_root_module';
import { PubsubsRunner } from './pubsub_runner';
import { PubsubSources } from './pubsub_sources';
import {
  PUBSUB_ERROR_HANDLER,
  ROOT_PUBSUBS,
  USER_PROVIDED_PUBSUBS,
  _ROOT_PUBSUBS,
} from './tokens';
import { getSourceForInstance } from './utils';

@NgModule()
export class PubSubModule {
  static forRoot(
    rootPubsubs: Type<any>[] = []
  ): ModuleWithProviders<PubsubRootModule> {
    return {
      ngModule: PubsubRootModule,
      providers: [
        {
          provide: PUBSUB_ERROR_HANDLER,
          useValue: defaultPubsubsErrorHandler,
        },
        PubsubsRunner,
        PubsubSources,
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
