import { Inject, NgModule } from '@angular/core';
import { IBaseMessage } from './message';
import { PubsubConfig } from './model';
import { IHandleMessage, PubsubService } from './pubsub.service';
import { PubsubsRunner } from './pubsub_runner';
import { PubsubSources } from './pubsub_sources';
import { ROOT_PUBSUBS } from './tokens';
import { getSourceForInstance } from './utils';
export const ROOT_PUBSUB_INIT = '@fsms/pubsub/init';
export const METADATA_KEY = '__@fsms/pubsub__';
@NgModule({})
export class PubsubRootModule {
  constructor(
    private sources: PubsubSources,
    runner: PubsubsRunner,
    pubsubService: PubsubService,
    @Inject(ROOT_PUBSUBS) rootPubsubs: any[]
  ) {
    rootPubsubs.forEach((h: IHandleMessage<any>) => {
      const y = getSourceForInstance(h);
      const z = y.constructor[METADATA_KEY] as PubsubConfig;

      z.messages.forEach((m: IBaseMessage) => {
        pubsubService.subscribe({
          messageType: m.messageType,
          callback: h.handle,
        });
      });
    });
    // runner.start();

    // rootPubsubs.forEach((pubsubSourceInstance) =>
    //   sources.addPubSub(pubsubSourceInstance)
    // );

    pubsubService.publish({ type: ROOT_PUBSUB_INIT });
  }

  addPubSub(pubsubSourceInstance: any) {
    this.sources.addPubSub(pubsubSourceInstance);
  }
}
