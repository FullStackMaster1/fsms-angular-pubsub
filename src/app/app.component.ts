import { Component, OnInit } from '@angular/core';
import { PubsubService } from '@fsms/angular-pubsub';
import { OrderReady } from './messages/order-ready-message';
import { OrderShipped } from './messages/order-shipped-message';
import { OrderCreated } from './messages/order-created-message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private pubsubService: PubsubService) {}

  ngOnInit(): void {}

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
