import { Injectable } from '@angular/core';
import {
  CallbackOptions,
  IHandleMessage,
  RegisterHandler,
} from '@fsms/angular-pubsub';
import { OrderReady } from '../messages/order-ready-message';
import { OrderCreated } from '../messages/order-created-message';

@Injectable({ providedIn: 'root' })
@RegisterHandler({
  messages: [OrderCreated],
})
export class PrepareOrderService implements IHandleMessage<OrderCreated> {
  handle({ message, context }: CallbackOptions<OrderCreated>): void {
    console.log('[Inventory] Packaging Order', message);
    context.publish(new OrderReady(message.payload));
  }
}
