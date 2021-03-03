import { Inject, NgModule } from '@angular/core';
import {  ReqresSources } from './reqres-sources';
import { FEATURE_REQRES } from './reqres-tokens';

@NgModule({})
export class ReqresFeatureModule {
  constructor(
    sources: ReqresSources,
    @Inject(FEATURE_REQRES) reqresSourceGroups: any[][]
  ) {
    reqresSourceGroups.forEach((group) =>
      group.forEach((reqresSourceInstance) =>
        sources.addReqRes(reqresSourceInstance)
      )
    );
  }
}
