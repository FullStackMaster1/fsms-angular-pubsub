import { Injectable } from '@angular/core';
import {
  CallbackOptions,
  IHandleMessage,
  RegisterHandler
} from '@fsms/angular-pubsub';
import { OrderPaid } from '../messages/order-paid-message';
import { OrderShipped } from '../messages/order-shipped-message';

@Injectable({ providedIn: 'root' })
@RegisterHandler({
  messages: [OrderShipped, OrderPaid],
})
export class OrderDeliveryService
  implements IHandleMessage<OrderShipped | OrderPaid> {
  handle({
    message,
    context,
  }: CallbackOptions<OrderShipped | OrderPaid>): void {
    console.log('[Inventory] Packaging Order', message);
  }
}
