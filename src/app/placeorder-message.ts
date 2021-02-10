import { Message } from '@fsms/angular-pubsub';

export const PlaceOrderType = '[Sells] Place Order';
export class PlaceOrder implements Message {
  readonly type = PlaceOrderType;
  constructor(public payload: any) {}
}
