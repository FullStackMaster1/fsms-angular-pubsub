import { Inject, NgModule } from '@angular/core';
import {  ReqResSources } from './reqres-sources';
import { FEATURE_REQRES } from './reqres-tokens';

@NgModule({})
export class PubsubFeatureModule {
  constructor(
    sources: ReqResSources,
    @Inject(FEATURE_REQRES) reqresSourceGroups: any[][]
  ) {
    reqresSourceGroups.forEach((group) =>
      group.forEach((reqresSourceInstance) =>
        sources.addReqRes(reqresSourceInstance)
      )
    );
  }
}
