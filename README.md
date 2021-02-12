
# Angular PubSub 

Angular 11.x implementation of the [publish subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) Pattern.

![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/fullstackmaster1/fsms-angular-pubsub/@angular/core) ![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/fullstackmaster1/fsms-angular-pubsub/CI%20and%20CD/main?style=flat) ![npm](https://img.shields.io/npm/dw/@fsms/angular-pubsub?style=flat) [![npm version](https://badge.fury.io/js/%40fsms%2Fangular-pubsub.svg)](https://badge.fury.io/js/%40fsms%2Fangular-pubsub) ![GitHub repo size](https://img.shields.io/github/repo-size/fullstackmaster1/FSMS-ANGULAR-PUBSUB) ![GitHub pull requests](https://img.shields.io/github/issues-pr/fullstackmaster1/fsms-angular-pubsub) ![GitHub last commit](https://img.shields.io/github/last-commit/fullstackmaster1/fsms-angular-pubsub) [![dependencies Status](https://status.david-dm.org/gh/FullStackMaster1/fsms-angular-pubsub.svg)](https://david-dm.org/FullStackMaster1/fsms-angular-pubsub) ![GitHub User's stars](https://img.shields.io/github/stars/fullstackmaster1?style=social) ![GitHub Sponsors](https://img.shields.io/github/sponsors/fullstackmaster1?style=social)

> By [Rupesh Tiwari](https://rupeshtiwari.com)

**If you enjoy @fsms/angular-pubsub, please consider [supporting me](https://github.com/sponsors/rupeshtiwari) for years of development (and to unlock rewards!) ❤**

## Table of Contents

- [Angular PubSub](#angular-pubsub)
  - [Table of Contents](#table-of-contents)
  - [Installing @fsms/angular-pubsub](#installing-fsmsangular-pubsub)
  - [Definitions](#definitions)
    - [Message](#message)
    - [Pub sub Service (Angular Service)](#pub-sub-service-angular-service)
  - [Using PubSub Service](#using-pubsub-service)
  - [Using Angular Service As Message Handler](#using-angular-service-as-message-handler)
  - [Contributions](#contributions)


## Installing @fsms/angular-pubsub

**npm installation**

```shell
npm i -S @fsms/angular-pubsub
```

## Definitions

You need `Message` class to create your messages and you need `PubsubService` to publish or subscribe messages. 
### Message 

`Message` holds `messageType` and optional payload

```ts
export interface IMessage {
  messageType: string;
  payload?: any;
}
```
Example of one message: 

```ts
import { DefineMessage, IMessageSchema, IMessage } from '@fsms/angular-pubsub';

@DefineMessage<IMessageSchema>()
export class PlaceOrder implements IMessage {
  static messageType = '[Sells] Place Order';
  messageType = PlaceOrder.messageType;
  constructor(public payload?: string) {}
}
```

### Pub sub Service (Angular Service)

`pubsubService` is used to publish and subscribe messages. 

```ts
publish<V extends IMessage = IMessage>(message: V): void;
subscribe({
    messageType,
    callback,
    error,
    complete,
  }: SubscribeOptions): PubsubSubscription;
```

## Using PubSub Service

1. **Importing PubsubModule in application module**.

Initialize module for root in your angular root module

```ts

import { PubSubModule } from '@fsms/angular-pubsub'; 👈 // Importing Angular Pubsub module

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
   PubSubModule.forRoot() 👈 // Initiate Pubsub module
],
providers: [],
bootstrap: [RootComponent]
});

```

2. **Injecting `PubsubService` as dependency in component** 

Go to desired component and subscribe to a message. 

```ts
import { Component } from '@angular/core';
import { PubsubService } from '@fsms/angular-pubsub';👈 // Importing Angular Pubsub module

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
   constructor(
     private pubsubService: PubsubService/* <= HERE */) {}
               👆// Injecting Angular Pubsub Service
}
```
3. **Subscribing to message**
  
  In `ngOnInit` method of angular, you can subscribe to the events that you want to react upon. 

```ts
import { PubsubService, PubsubSubscription } from '@fsms/angular-pubsub';
import { PlaceOrder } from './orders/messages/place-order-message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  subscriptions: PubsubSubscription[] = [];

  constructor(private pubsubService: PubsubService) {}

  ngOnInit(): void {
         
    this.subscriptions.push(
      this.pubsubService.subscribe({ 👈// Subscribing to a message
        messageType: PlaceOrder.messageType,
        callback: (msg) => console.log('received', msg),
      })
    );
  }
}
```
4. **Publishing a Message** 
The `publish`  method takes one argument where it expect the `Message` object.

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

    this.pubsubService.publish( 👈// Publishing a message
      new OrderCreated({
        orderId: new Date().getTime().toString(36),
        item: '20 Apples',
      })
    );
  }
}
```
5. **Unsubscribing Messages**

Keep all subscriptions per component in an array. And On component you must unsubscribe your subscriptions on `ngOnDestroy` event. 

```ts
 ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());👈// Unsubscribing a message
  }
```

## Using Angular Service As Message Handler

Convert Angular service to a Message Handler. If to organize your angular code base as Service Oriented Architecture (SOA) way. And you want to create an Angular service that can listen to a Message and react on them just like a N-ServiceBus Message Handlers? 

Then you must use `@RegisterHandler({})` decorator on any Angular Service then it will automatically be registered as message subscriber. This helps us to organize your business logic in services rather in angular components.

**Message Handler**

Message handler is a service that can listen to one message or more messages and perform business logic. Message Handler can also publish after handling incoming messages. 

Diagram of a Angular Service as Message Handler called as `ShipOrderService` which listens to `OrderReady` message and process shipping then publishes `OrderShipped` message. 

![](https://i.imgur.com/r60vyT4.png)


**Creating Message Handler at Root Module**

1. First create your message handler at Root (App) Module.
  
Example: When Order is Ready Shipping service is starting the shipment process.

```ts
import { Injectable } from '@angular/core';
import {
  CallbackOptions,
  IHandleMessage,
  RegisterHandler,
} from '@fsms/angular-pubsub';
import { OrderReady } from '../messages/order-ready-message';
import { OrderShipped } from '../messages/order-shipped-message';

@Injectable({ providedIn: 'root' }) // Angular Service
@RegisterHandler({ 👈
  messages: [OrderReady],👈 // You can listen to many messages
})
export class ShipOrderService implements IHandleMessage<OrderReady> {
  handle({ message, context }: CallbackOptions<OrderReady>): void {
    console.log('[Shipping] Order Shipped', message);

    context.publish(new OrderShipped(message.payload));
    👆 // context will have publish method to publish any message from message handler. 
  }
}
```

2. Register your message handler in Root (App) Module.
  
Use `PubsubModule.forRoot([])` to register your app message handlers.

Example: Registering `ShipOrderService`
```ts
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PubsubModule } from '@fsms/angular-pubsub';
import { AppComponent } from './app.component';
import { ShipOrderService } from './services/ship-order.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    PubsubModule.forRoot([ // Register App Module level Message Handlers
      ShipOrderService, 👈
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

**Creating Message Handler at Feature Module Level**

In order to achieve true service oriented architecture. You must create independent isolated feature modules. The message handlers gives you the power to register your message handlers at feature module level. 

1. First create your message handler at Feature Module.

Example: `Create Order` Message handler in `Orders` module. 

```ts
import { CallbackOptions, IHandleMessage } from '@fsms/angular-pubsub';
import { RegisterHandler } from 'projects/fsms-angular-pubsub/src/lib/pubsub-decorator';
import { OrderCreated } from 'src/app/messages/order-created-message';
import { PlaceOrder } from '../messages/place-order-message';

@RegisterHandler({👈 // Create as Message Handler
  messages: [PlaceOrder],
})
export class CreateOrderService implements IHandleMessage<PlaceOrder> {
  constructor() {}

  handle({ message, context }: CallbackOptions<PlaceOrder>): void {
    console.log(`[Sales] Order Created`, message);

    context.publish(
      new OrderCreated({
        orderId: new Date().getTime().toString(36),
        item: message.payload,
      })
    );
  }
}

```

2. Register your message handler in Feature Module.

Use `PubsubModule.forFeature([])` to register your feature message handlers.

Example: Registering `CreateOrderService` at orders module. 

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitOrderComponent } from './submit-order/submit-order.component';
import { CreateOrderService } from './services/create-order.service';
import { PubsubModule } from '@fsms/angular-pubsub';

@NgModule({
  declarations: [SubmitOrderComponent],
  imports: [CommonModule, 
    PubsubModule.forFeature([CreateOrderService]) 👈 // Registering as feature message handler
  ],
  exports: [SubmitOrderComponent],
})
export class OrdersModule {}
```

## Contributions

Contributions are welcome!🙂 If you find any problems or would like to contribute in any way, feel free to create a pull request/open an issue/send me a message.

You can also contribute by becoming an [official sponsor](https://github.com/sponsors/rupeshtiwari) to help keep Angular Pub-Sub well-maintained.

💖 Say 👋 to me!
Rupesh Tiwari
<a href="https://www.rupeshtiwari.com"> www.rupeshtiwari.com</a>
✉️ <a href="mailto:fullstackmaster1@gmail.com?subject=Hi"> Email Rupesh Tiwari</a>
Founder of <a href="https://www.fullstackmaster.net"> Fullstack Master</a>

