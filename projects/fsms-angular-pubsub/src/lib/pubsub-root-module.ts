import { Inject, NgModule } from '@angular/core';
import { PubsubService } from './pubsub.service';
import { subscribePubsubs } from './pubsub-resolver';
import { PubsubSources } from './pubsub-sources';
import { ROOT_PUBSUBS } from './tokens';

export const ROOT_PUBSUB_INIT = '@fsms/pubsub/init';

@NgModule({})
export class PubsubRootModule {
  constructor(
    pubsubService: PubsubService,
    sources: PubsubSources,
    @Inject(ROOT_PUBSUBS) rootPubsubs: any[]
  ) {
    sources.addPubsubs(rootPubsubs);
    subscribePubsubs(sources.getAllPubsubInstances(), pubsubService);
    pubsubService.publish({ messageType: ROOT_PUBSUB_INIT });
  }
}
