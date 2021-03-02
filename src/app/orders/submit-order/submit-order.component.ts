import { Component, OnInit } from '@angular/core';
import { PubsubService } from '@fsms/angular-pubsub';
import { PlaceOrder } from '../messages/place-order-message';

@Component({
  selector: 'app-submit-order',
  templateUrl: './submit-order.component.html',
  styleUrls: ['./submit-order.component.css'],
})
export class SubmitOrderComponent implements OnInit {
  constructor(private readonly pubsubService: PubsubService) {}

  ngOnInit(): void {}

  placeOrder($event: MouseEvent) {
    $event.preventDefault();
    this.pubsubService.publish(new PlaceOrder('20 Oranges'));
  }
}
