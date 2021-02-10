import { IBaseMessage, MessageDefinition } from '@fsms/angular-pubsub';

export const OrderPlacedType = '[Sells] Place Order';

@MessageDefinition<IBaseMessage>()
export class OrderPlaced {
  static messageType = '[Sales] Order Placed';
  type = OrderPlaced.messageType;
  constructor(public payload?: string) {}
}
