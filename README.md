[![Actions Status](https://github.com/rupeshtiwari/fsms-angular-pubsub/workflows/.github/workflows/main.yml/badge.svg)](https://github.com/rupeshtiwari/fsms-angular-pubsub/actions)

# Angular Pub/Sub Framework for Angular versions

Angular publish subscribe framework written by using `RxJS` only. 

## Installing Package

- Run below to install

```
npm i -S @fsms/angular-pubsub
```
## Using Pub Sub 

1. Importing Module 

Initialize module for root in your angular root module

```ts

import { PubSubModule } from '@fsms/angular-pubsub'; // <= HERE

@NgModule({
declarations: [
   RootComponent,
   NavigationComponent,
   OverlayComponent
],
imports: [
   BrowserModule,
   FormsModule,
   HttpModule,
   PubSubModule.forRoot() // <= AND HERE
],
providers: [],
bootstrap: [RootComponent]
});

```

2. Subscribing to Message 

Go to desired component and subscribe to a message. 

```ts
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
    this.messageService.subscribe({ // <= HERE
      messageType: PlaceOrderType,
      callback: (msg) => console.log('received', msg),
    });
  }
}
```
3. Publishing Message 

Now on a button click, I want to publish a message with some payload.

```ts
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
    this.messageService.publish(new PlaceOrder('20 Apples'));// <= HERE
  }
}
```


### Thank You!

**💖 Say 👋 to me!**
Rupesh Tiwari <br/>
<a href="https://www.rupeshtiwari.com"> www.rupeshtiwari.com</a> <br/>
✉️ <a href="mailto:fullstackmaster1@gmail.com?subject=Hi"> Email Rupesh</a><br/>
Founder of <a href="https://www.fullstackmaster.net"> Fullstack Master</a>

