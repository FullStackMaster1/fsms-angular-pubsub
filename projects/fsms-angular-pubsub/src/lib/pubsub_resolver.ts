import { IBaseMessage } from './message';
import { PubsubConfig } from './model';
import { IHandleMessage, PubsubService } from './pubsub.service';
import { getPubsubDecoratorMetadata } from './pubsub_metadata';

export function subscribePubsubs(
  rootPubsubs: any[],
  pubsubService: PubsubService
) {
  rootPubsubs.forEach((h: IHandleMessage<any>) => {
    const z = getPubsubDecoratorMetadata(h) as PubsubConfig;
    z.messages.forEach((m: IBaseMessage) => {
      pubsubService.subscribe({
        messageType: m.messageType,
        callback: h.handle,
      });
    });
  });
}
