import { Inject, NgModule } from '@angular/core';
import { PubsubSources } from './pubsub-sources';
import { PubsubService } from './pubsub.service';
import { ROOT_PUBSUBS, ROOT_PUBSUB_INIT } from './pubsub-tokens';

@NgModule({})
export class PubsubRootModule {
  constructor(
    pubsubService: PubsubService,
    sources: PubsubSources,
    @Inject(ROOT_PUBSUBS) rootPubsubs: any[]
  ) {
    sources.addPubsubs(rootPubsubs);
    sources.subscribe();
    pubsubService.publish({ messageType: ROOT_PUBSUB_INIT });
  }
}
