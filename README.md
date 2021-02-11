

# Angular PubSub 

Angular 11.x implementation of the [publish subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) Pattern.

![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/fullstackmaster1/fsms-angular-pubsub/CI%20and%20CD/main?style=plastic)

![npm](https://img.shields.io/npm/dw/@fsms/angular-pubsub?style=plastic)

[![npm version](https://badge.fury.io/js/%40fsms%2Fangular-pubsub.svg)](https://badge.fury.io/js/%40fsms%2Fangular-pubsub)

![GitHub repo size](https://img.shields.io/github/repo-size/fullstackmaster1/FSMS-ANGULAR-PUBSUB)

[![dependencies Status](https://status.david-dm.org/gh/FullStackMaster1/fsms-angular-pubsub.svg)](https://david-dm.org/FullStackMaster1/fsms-angular-pubsub)



## Installing

**npm installation**

```shell
npm i -S @fsms/angular-pubsub
```
## Using PubSub For Inline Style

1. **Importing PubsubModule in application module**.

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

2. **Injecting `PubsubService` as dependency in component** 

Go to desired component and subscribe to a message. 

```ts
import { Component } from '@angular/core';
import { PubsubService } from '@fsms/angular-pubsub';// <= HERE

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
   constructor(
     private pubsubService: PubsubService/* <= HERE */) {}
}
```
3. **Subscribing to message**
  
  In `ngOnInit` method of angular, you can subscribe to the events that you want to react upon. 

```ts
ngOnInit(): void {
  this.pubsubService.subscribe({ // <= HERE
        messageType: PlaceOrderType,
        callback: (msg) => console.log('received', msg),
      });
}
```
4. **Publishing Message** 
The `publish`  method takes one argument where it expect the `message` object.

Example: Now on a button click, I want to publish a message with some payload.

```ts
import { Component } from '@angular/core';
import { OrderPlaced } from './messages/placeorder-message';
import { PubsubService } from '@fsms/angular-pubsub';// <= HERE

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
     private pubsubService: PubsubService/* <= HERE */) {}

  orderPlaced($event: KeyboardEvent) {
    $event.preventDefault();

    this.pubsubService.publish(new OrderPlaced('20 Apples'));// <= HERE
  }
}
```
5. **Unsubscribing Messages**


---

**Thank You!**

💖 Say 👋 to me!
Rupesh Tiwari
<a href="https://www.rupeshtiwari.com"> www.rupeshtiwari.com</a>
✉️ <a href="mailto:fullstackmaster1@gmail.com?subject=Hi"> Email Rupesh</a>
Founder of <a href="https://www.fullstackmaster.net"> Fullstack Master</a>

