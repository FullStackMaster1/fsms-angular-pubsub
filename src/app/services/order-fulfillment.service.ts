import { Injectable } from '@angular/core';
import {
  CallbackOptions,
  IHandleMessage,
  RegisterHandler,
} from '@fsms/angular-pubsub';
import { OrderCreated } from '../messages/order-created-message';
import { OrderPaid } from '../messages/order-paid-message';
import { OrderShipped } from '../messages/order-shipped-message';

@Injectable({ providedIn: 'root' })
@RegisterHandler({
  messages: [OrderShipped, OrderPaid, OrderCreated],
})
export class OrderFulfillmentService
  implements IHandleMessage<OrderShipped | OrderPaid | OrderCreated> {
  private get initialState() {
    return {
      shipped: false,
      paid: false,
    };
  }

  private state = this.initialState;

  handle({
    message,
    context,
  }: CallbackOptions<OrderShipped | OrderPaid>): void {
    if (message.messageType === OrderShipped.messageType) {
      console.log('[Sells Order Fulfillment]: Marked Shipped');
      this.state = {
        ...this.state,
        shipped: true,
      };
    }

    if (message.messageType === OrderPaid.messageType) {
      console.log('[Sells Order Fulfillment]: Marked Paid');
      this.state = {
        ...this.state,
        paid: true,
      };
    }

    if (message.messageType === OrderCreated.messageType) {
      this.state = this.initialState;
    }

    this.markAsDelivered();
  }

  private markAsDelivered() {
    if (this.state.shipped && this.state.paid) {
      console.log('[Sells Order Fulfillment]: ', 'Order is delivered!');
      this.state = this.initialState;
    }
  }
}
