import { Inject, NgModule } from '@angular/core';
import { PubsubService } from '../pubsub/pubsub.service';
import { ReqresSources } from './reqres-sources';
import { ROOT_REQRES, ROOT_REQRES_INIT } from './reqres-tokens';



@NgModule({})
export class ReqresRootModule {
  constructor(
    pubsubService: PubsubService,
    sources: ReqresSources,
    @Inject(ROOT_REQRES) rootReqresInstances: any[]
  ) {
    sources.addReqResList(rootReqresInstances);
    sources.subscribe();
    pubsubService.publish({ messageType: ROOT_REQRES_INIT });
  }
}
