import { Inject, NgModule } from '@angular/core';
import { PubsubSources } from './pubsub-sources';
import { FEATURE_PUBSUBS } from './pubsub-tokens';

@NgModule({})
export class PubsubFeatureModule {
  constructor(
    sources: PubsubSources,
    @Inject(FEATURE_PUBSUBS) pubsubSourceGroups: any[][]
  ) {
    pubsubSourceGroups.forEach((group) =>
      group.forEach((pubsubSourceInstance) =>
        sources.addPubsub(pubsubSourceInstance)
      )
    );
  }
}
