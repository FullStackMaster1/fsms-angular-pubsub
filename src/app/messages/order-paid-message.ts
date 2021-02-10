import { MessageDefinition, IBaseMessage } from '@fsms/angular-pubsub';

@MessageDefinition<IBaseMessage>()
export class OrderPaid {
  static messageType = '[Payment] Order Paid';
  type = OrderPaid.messageType;
  constructor(public payload?: string) {}
}
