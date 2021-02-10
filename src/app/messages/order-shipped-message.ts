import { MessageDefinition, IBaseMessage } from '@fsms/angular-pubsub';

@MessageDefinition<IBaseMessage>()
export class OrderShipped {
  static messageType = '[Shipping] Order Shipped';
  type = OrderShipped.messageType;
  constructor(public payload?: any) {}
}
