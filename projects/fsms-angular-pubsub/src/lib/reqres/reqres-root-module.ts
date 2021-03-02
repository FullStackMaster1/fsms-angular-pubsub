import { Inject, NgModule } from '@angular/core';
import { PubsubService } from '../pubsub/pubsub.service';
import { ReqResSources } from './reqres-sources';
import { ROOT_REQRES, ROOT_REQRES_INIT } from './reqres-tokens';



@NgModule({})
export class ReqresRootModule {
  constructor(
    pubsubService: PubsubService,
    sources: ReqResSources,
    @Inject(ROOT_REQRES) rootReqress: any[]
  ) {
    sources.addReqResList(rootReqress);
    sources.subscribe();
    pubsubService.publish({ messageType: ROOT_REQRES_INIT });
  }
}
