import { Injectable } from '@angular/core';
import {
  CallbackOptions,
  IHandleMessage,
  RegisterHandler,
} from '@fsms/angular-pubsub';
import { OrderReady } from '../messages/order-ready-message';
import { OrderShipped } from '../messages/order-shipped-message';

@Injectable({ providedIn: 'root' })
@RegisterHandler({
  messages: [OrderReady],
})
export class ShipOrderService implements IHandleMessage<OrderReady> {
  handle({ message, context }: CallbackOptions<OrderReady>): void {
    console.log('[Shipping] Order Shipped', message);

    context.publish(new OrderShipped(message.payload));
  }
}
