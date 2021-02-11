import { IHandleMessage, PubsubService } from '@fsms/angular-pubsub';
import { RegisterHandler } from 'projects/fsms-angular-pubsub/src/lib/pubsub_decorator';
import { OrderPlaced } from 'src/app/messages/placeorder-message';
import { PlaceOrder } from '../messages/place-order-message';

@RegisterHandler({
  messages: [PlaceOrder]
})
export class PlaceOrderService implements IHandleMessage<PlaceOrder>{
  constructor() {}

  handle(message: PlaceOrder): void {
    console.log(`created order`, message);
    this.pubsubService.publish(new OrderPlaced(message.payload));
  }


}
