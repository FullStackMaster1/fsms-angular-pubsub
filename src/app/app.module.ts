import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PubsubModule } from '@fsms/angular-pubsub';
import { AppComponent } from './app.component';
import {
  PrepareOrderService,
  ShipOrderService,
} from './services/ship-order.service';
import { FormsModule } from '@angular/forms';
import { OrdersModule } from './orders/orders.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    OrdersModule,
    FormsModule,
    PubsubModule.forRoot([ShipOrderService, PrepareOrderService]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
