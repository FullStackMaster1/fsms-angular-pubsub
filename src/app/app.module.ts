import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PubsubModule } from '@fsms/angular-pubsub';
import { AppComponent } from './app.component';
import { OrdersModule } from './orders/orders.module';
import { PrepareOrderService } from './services/prepare-order.service';
import { ShipOrderService } from './services/ship-order.service';

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
