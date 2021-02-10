import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PubSubModule } from '@fsms/angular-pubsub';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PubSubModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
