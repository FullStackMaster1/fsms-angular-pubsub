import { Component } from '@angular/core';
import { PubSubService } from '@fsms/angular-pubsub';
import { PlaceOrder, PlaceOrderType } from './placeorder-message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private messageService: PubSubService) {
    this.messageService.subscribe({
      messageType: PlaceOrderType,
      callback: (msg) => console.log('received', msg),
    });
  }

  sendMessage($event: KeyboardEvent) {
    $event.preventDefault();
    this.messageService.publish(new PlaceOrder('20 Apples'));
  }
}
