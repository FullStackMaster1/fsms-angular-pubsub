import { CallbackOptions, IHandleMessage } from '@fsms/angular-pubsub';
import { RegisterHandler } from 'projects/fsms-angular-pubsub/src/lib/pubsub-decorator';
import { OrderCreated } from 'src/app/messages/order-created-message';
import { PlaceOrder } from '../messages/place-order-message';

@RegisterHandler({
  messages: [PlaceOrder],
})
export class CreateOrderService implements IHandleMessage<PlaceOrder> {
  constructor() {}

  handle({ message, context }: CallbackOptions<PlaceOrder>): void {
    console.log(`[Sales] Order Created`, message);

    context.publish(
      new OrderCreated({
        orderId: new Date().getTime().toString(36),
        item: message.payload,
      })
    );
  }
}
