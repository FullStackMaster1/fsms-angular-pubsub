import { Inject, NgModule } from '@angular/core';
import { PubsubService } from './pubsub.service';
import { PubsubsRunner } from './pubsub_runner';
import { PubsubSources } from './pubsub_sources';
import { ROOT_PUBSUBS } from './tokens';
export const ROOT_PUBSUB_INIT = '@fsms/pubsub/init';

@NgModule({})
export class PubsubRootModule {
  constructor(
    private sources: PubsubSources,
    runner: PubsubsRunner,
    pubsubService: PubsubService,
    @Inject(ROOT_PUBSUBS) rootPubsubs: any[]
  ) {
    runner.start();

    rootPubsubs.forEach((pubsubSourceInstance) =>
      sources.addPubSub(pubsubSourceInstance)
    );

    pubsubService.publish({ type: ROOT_PUBSUB_INIT });
  }

  addPubSub(pubsubSourceInstance: any) {
    this.sources.addPubSub(pubsubSourceInstance);
  }
}
