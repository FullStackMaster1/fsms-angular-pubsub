import { Message } from '@fsms/angular-pubsub';

export const OrderShippedType = '[Shipping] Order Shipped';
export class OrderShipped implements Message {
  readonly type = OrderShippedType;
  constructor(public payload: any) {}
}
