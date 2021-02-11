import { NgModule, Inject, Optional } from '@angular/core';
import { StoreRootModule, StoreFeatureModule } from '@ngrx/store';
import { PubsubsRootModule } from './effects_root_module';
import { FEATURE_PUBSUBS } from './tokens';

@NgModule({})
export class PubsubsFeatureModule {
  constructor(
    root: PubsubsRootModule,
    @Inject(FEATURE_PUBSUBS) effectSourceGroups: any[][],
    @Optional() storeRootModule: StoreRootModule,
    @Optional() storeFeatureModule: StoreFeatureModule
  ) {
    effectSourceGroups.forEach((group) =>
      group.forEach((effectSourceInstance) =>
        root.addPubsubs(effectSourceInstance)
      )
    );
  }
}
