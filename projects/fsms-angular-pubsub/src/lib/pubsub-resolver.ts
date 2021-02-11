import { IHandleMessage } from './contracts/definitions';
import { IMessageSchema } from './message';
import { PubsubService } from './pubsub.service';
import { getPubsubDecoratorMetadata } from './pubsub-metadata';

export function subscribePubsubs(
  allPubsubInstances: any[],
  pubsubService: PubsubService
) {
  allPubsubInstances.forEach((h: IHandleMessage<any>) => {
    const z = getPubsubDecoratorMetadata(h);

    z.messages.forEach((m: IMessageSchema) => {
      pubsubService.subscribe({
        messageType: m.messageType,
        callback: h.handle.bind(h) as any,
      });
    });
  });
}
