import { DefineMessage, IMessageSchema, IMessage } from '@fsms/angular-pubsub';

@DefineMessage<IMessageSchema>()
export class OrderShipped implements IMessage {
  static messageType = '[Shipping] Order Shipped';
  messageType = OrderShipped.messageType;
  constructor(public payload?: any) {}
}
