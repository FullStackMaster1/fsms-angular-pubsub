import { Message } from '@fsms/angular-pubsub';

export const OrderPaidType = '[Sells] Order Paid';

export class OrderPaid implements Message {
  readonly type = OrderPaidType;
  constructor(public payload: any) {}
}
