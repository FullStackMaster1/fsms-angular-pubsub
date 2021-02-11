import {
  DefineMessage,
  IMessageSchema,
  IMessage,
} from '@fsms/angular-pubsub';

@DefineMessage<IMessageSchema>()
export class OrderReady implements IMessage {
  static messageType = '[Inventory] Order Ready';
  messageType = OrderReady.messageType;
  constructor(public payload?: any) {}
}
