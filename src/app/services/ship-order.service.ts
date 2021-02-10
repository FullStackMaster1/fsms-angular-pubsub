import { Injectable, Type } from '@angular/core';
import { inject } from '@angular/core/testing';
import { BaseMessageHandler, Message } from '@fsms/angular-pubsub';
import { MessageHandler } from 'projects/fsms-angular-pubsub/src/lib/pubsub_decorator';
import { OrderPaid } from '../messages/order-paid-message';
import { OrderPlaced, OrderPlacedType } from '../messages/placeorder-message';

@Injectable()
export class ShipOrderService extends BaseMessageHandler<
  [OrderPlaced, OrderPaid]
> {

}
