import { IMessageSchema } from './message';
import { IHandleMessage, PubsubService } from './pubsub.service';
import { getPubsubDecoratorMetadata } from './pubsub_metadata';

export function subscribePubsubs(
  allPubsubs: any[],
  pubsubService: PubsubService
) {
  allPubsubs.forEach((h: IHandleMessage<any>) => {
    const z = getPubsubDecoratorMetadata(h);

    z.messages.forEach((m: IMessageSchema) => {
      pubsubService.subscribe({
        messageType: m.messageType,
        callback: h.handle as any,
      });
    });
  });
}
