import { IHandleMessage, IMessageHandlerContext } from '@fsms/angular-pubsub';
import { RegisterHandler } from 'projects/fsms-angular-pubsub/src/lib/pubsub_decorator';
import { OrderPlaced } from 'src/app/messages/placeorder-message';
import { PlaceOrder } from '../messages/place-order-message';

@RegisterHandler({
  messages: [PlaceOrder],
})
export class PlaceOrderService implements IHandleMessage<PlaceOrder> {
  constructor() {}

  handle(message: PlaceOrder, context: IMessageHandlerContext): void {
    console.log('received place order', message);
    context.publish(new OrderPlaced(message.payload));
  }
}
