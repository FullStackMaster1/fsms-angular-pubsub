import { Component, OnDestroy, OnInit } from '@angular/core';
import { PubsubService, PubsubSubscription } from '@fsms/angular-pubsub';
import { OrderCreated } from './messages/order-created-message';
import { OrderReady } from './messages/order-ready-message';
import { OrderShipped } from './messages/order-shipped-message';
import { PlaceOrder } from './orders/messages/place-order-message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions: PubsubSubscription[] = [];

  constructor(private pubsubService: PubsubService) {}

  ngOnInit(): void {
    // HERE >=
    this.subscriptions.push(
      this.pubsubService.subscribe({
        messageType: PlaceOrder.messageType,
        callback: (msg) => console.log('received', msg),
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  orderPlaced($event: KeyboardEvent) {
    $event.preventDefault();
    this.pubsubService.publish(
      new OrderCreated({
        orderId: new Date().getTime().toString(36),
        item: '20 Apples',
      })
    );
  }
  orderPaid($event: KeyboardEvent) {
    $event.preventDefault();
    this.pubsubService.publish(new OrderReady('20 USD'));
  }
  orderShipped($event: KeyboardEvent) {
    $event.preventDefault();
    this.pubsubService.publish(new OrderShipped('CA, USA'));
  }
}
