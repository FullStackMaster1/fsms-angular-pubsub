import { IMessageSchema, IMessage, DefineMessage } from '@fsms/angular-pubsub';

@DefineMessage<IMessageSchema>()
export class OrderPaid implements IMessage {
  static messageType = '[Pricing] Order Paid';
  messageType = OrderPaid.messageType;
  constructor(public payload?: string) {}
}
