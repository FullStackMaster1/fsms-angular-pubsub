import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PubSubModule } from '@fsms/angular-pubsub';
import { AppComponent } from './app.component';
import {
  PrepareOrderService,
  ShipOrderService,
} from './services/ship-order.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    PubSubModule.forRoot([ShipOrderService, PrepareOrderService]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
