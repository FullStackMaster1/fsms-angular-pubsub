import { IMessageSchema, IMessage, DefineMessage } from '@fsms/angular-pubsub';

@DefineMessage<IMessageSchema>()
export class OrderCreated implements IMessage {
  static messageType = '[Sales] Order Created';
  messageType = OrderCreated.messageType;
  constructor(
    public payload?: {
      orderId: string;
      item: string;
    }
  ) {}
}
