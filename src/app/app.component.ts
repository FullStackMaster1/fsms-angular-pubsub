import { Component } from '@angular/core';
import { PubsubService } from '@fsms/angular-pubsub';
import { OrderPlaced, OrderPlacedType } from './messages/placeorder-message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private messageService: PubsubService) {
    this.messageService.subscribe({
      messageType: OrderPlacedType,
      callback: (msg) => console.log('received', msg),
    });
  }

  sendMessage($event: KeyboardEvent) {
    $event.preventDefault();
    this.messageService.publish(new OrderPlaced('20 Apples'));
  }
}
