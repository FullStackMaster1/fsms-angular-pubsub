import { Message } from '@fsms/angular-pubsub';

export const OrderPlacedType = '[Sells] Place Order';
export class OrderPlaced implements Message {
  readonly type = OrderPlacedType;
  constructor(public payload: any) {}
}
