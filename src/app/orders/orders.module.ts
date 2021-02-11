import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitOrderComponent } from './submit-order/submit-order.component';
import { PlaceOrderService } from './services/place-order.service';
import { PubsubModule } from '@fsms/angular-pubsub';

@NgModule({
  declarations: [SubmitOrderComponent],
  imports: [CommonModule, PubsubModule.forFeature([PlaceOrderService])],
  exports:[ SubmitOrderComponent]
})
export class OrdersModule {}
