import { IMessageSchema, IMessage, DefineMessage } from '@fsms/angular-pubsub';

export const OrderPlacedType = '[Sells] Place Order';

@DefineMessage<IMessageSchema>()
export class OrderPlaced implements IMessage {
  static messageType = '[Sales] Order Placed';
  messageType = OrderPlaced.messageType;
  constructor(public payload?: string) {}
}
