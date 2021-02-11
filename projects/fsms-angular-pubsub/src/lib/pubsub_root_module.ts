import { Inject, NgModule } from '@angular/core';
import { PubsubService } from './pubsub.service';
import { subscribePubsubs } from './pubsub_resolver';
import { PubsubSources } from './pubsub_sources';
import { ROOT_PUBSUBS } from './tokens';

export const ROOT_PUBSUB_INIT = '@fsms/pubsub/init';
export const METADATA_KEY = '__@fsms/pubsub__';

@NgModule({})
export class PubsubRootModule {
  constructor(
    pubsubService: PubsubService,
    private sources: PubsubSources,
    @Inject(ROOT_PUBSUBS) rootPubsubs: any[]
  ) {
    sources.addPubsubs(rootPubsubs);
    subscribePubsubs(rootPubsubs, pubsubService);
    pubsubService.publish({ type: ROOT_PUBSUB_INIT });
  }

  addPubsubs(pubsubInstances: any[]) {
    this.sources.addPubsubs(pubsubInstances);
  }
}
