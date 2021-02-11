import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitOrderComponent } from './submit-order/submit-order.component';
import { CreateOrderService } from './services/create-order.service';
import { PubsubModule } from '@fsms/angular-pubsub';

@NgModule({
  declarations: [SubmitOrderComponent],
  imports: [CommonModule, PubsubModule.forFeature([CreateOrderService])],
  exports: [SubmitOrderComponent],
})
export class OrdersModule {}
