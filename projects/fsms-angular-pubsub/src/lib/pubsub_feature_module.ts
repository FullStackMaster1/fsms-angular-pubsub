import { NgModule, Inject, Optional } from '@angular/core';
import { PubsubRootModule } from './pubsub_root_module';

import { FEATURE_PUBSUBS } from './tokens';

@NgModule({})
export class PubsubFeatureModule {
  constructor(
    root: PubsubRootModule,
    @Inject(FEATURE_PUBSUBS) pubsubSourceGroups: any[][],
  ) {
    pubsubSourceGroups.forEach((group) =>
      group.forEach((pubsubSourceInstance) =>
        root.addPubsubs(pubsubSourceInstance)
      )
    );
  }
}
