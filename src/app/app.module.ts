import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PubSubModule } from '@fsms/angular-pubsub';
import { AppComponent } from './app.component';
import {
  PrepareOrderService,
  ShipOrderService,
} from './services/ship-order.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    PubSubModule.forRoot([ShipOrderService, PrepareOrderService]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
