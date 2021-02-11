import {
  DefineMessage,
  IMessageSchema,
  IMessage,
} from '@fsms/angular-pubsub';

@DefineMessage<IMessageSchema>()
export class OrderPaid implements IMessage {
  static messageType = '[Payment] Order Paid';
  messageType = OrderPaid.messageType;
  constructor(public payload?: string) {}
}
