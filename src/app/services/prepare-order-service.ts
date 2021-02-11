import { Injectable } from '@angular/core';
import {
  CallbackOptions,
  IHandleMessage,
  RegisterHandler,
} from '@fsms/angular-pubsub';
import { OrderReady } from '../messages/order-ready-message';
import { OrderPlaced } from '../messages/placeorder-message';

@Injectable({ providedIn: 'root' })
@RegisterHandler({
  messages: [OrderPlaced, OrderReady],
})
export class PrepareOrderService
  implements IHandleMessage<OrderReady | OrderPlaced> {
  handle({
    message,
    context,
  }: CallbackOptions<OrderReady | OrderPlaced>): void {
    console.log('[Inventory] Packaging Order', message);
    context.publish(new OrderReady(message.payload));
  }
}
