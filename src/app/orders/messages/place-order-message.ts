import { DefineMessage, IMessageSchema, IMessage } from '@fsms/angular-pubsub';

@DefineMessage<IMessageSchema>()
export class PlaceOrder implements IMessage {
  static messageType = '[Sells] Place Order';
  messageType = PlaceOrder.messageType;
  constructor(public payload?: string) {}
}
