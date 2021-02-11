import {
  CallbackOptions,
  IHandleMessage,
} from '@fsms/angular-pubsub';
import { RegisterHandler } from 'projects/fsms-angular-pubsub/src/lib/pubsub-decorator';
import { OrderPlaced } from 'src/app/messages/placeorder-message';
import { PlaceOrder } from '../messages/place-order-message';

@RegisterHandler({
  messages: [PlaceOrder],
})
export class PlaceOrderService implements IHandleMessage<PlaceOrder> {
  constructor() {}

  handle({ message, context }: CallbackOptions<PlaceOrder>): void {
    console.log(`[Sales] Order Created`, message);

    context.publish(new OrderPlaced(message.payload));
  }
}
