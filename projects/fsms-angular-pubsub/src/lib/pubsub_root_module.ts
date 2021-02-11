import { Inject, NgModule } from '@angular/core';
import { PubsubService } from './pubsub.service';
import { subscribePubsubs } from './pubsub_resolver';
import { ROOT_PUBSUBS } from './tokens';

export const ROOT_PUBSUB_INIT = '@fsms/pubsub/init';
export const METADATA_KEY = '__@fsms/pubsub__';
@NgModule({})
export class PubsubRootModule {
  constructor(
    pubsubService: PubsubService,
    @Inject(ROOT_PUBSUBS) rootPubsubs: any[]
  ) {
    subscribePubsubs(rootPubsubs, pubsubService);
    pubsubService.publish({ type: ROOT_PUBSUB_INIT });
  }
}
