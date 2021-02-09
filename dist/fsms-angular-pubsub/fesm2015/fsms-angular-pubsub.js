import { Injectable, NgModule } from '@angular/core';
import { ReplaySubject } from 'rxjs';

const ServiceName = 'PubSub Service';
class PubSubService {
    constructor() {
        this.map = new Map();
        this.subscriptions = [];
    }
    subscribe({ message, callback, error, complete, }) {
        if (!message) {
            throw new Error(`[${ServiceName}] => Subscription method must get event name.`);
        }
        const messageType = message.type;
        if (!this.hasSubject(messageType)) {
            this.setNewSubject(messageType);
        }
        let subject = this.getSubject(messageType);
        if (typeof callback !== 'function') {
            return subject.asObservable();
        }
        else {
            const subscription = subject
                .asObservable()
                .subscribe(callback, error, complete);
            this.addSubscription(subscription);
            return subscription;
        }
    }
    publish(message) {
        if (!message) {
            throw new Error(`[${ServiceName}] => Publish method must get event name.`);
        }
        else if (!this.hasSubject(message.type)) {
            return;
        }
        this.getSubject(message.type).next(message);
    }
    clearAllSubscriptions() {
        this.subscriptions.forEach((s) => s && s.unsubscribe());
        this.subscriptions.length = 0;
        this.map.clear();
    }
    addSubscription(sub) {
        this.subscriptions.push(sub);
    }
    getSubject(messageType) {
        return this.map.get(messageType);
    }
    hasSubject(messageType) {
        return this.map.has(messageType);
    }
    setNewSubject(messageType) {
        this.map.set(messageType, new ReplaySubject());
    }
}
PubSubService.decorators = [
    { type: Injectable }
];

class PubSubModule {
    static forRoot() {
        return {
            ngModule: PubSubModule,
            providers: [
                PubSubService
            ]
        };
    }
}
PubSubModule.decorators = [
    { type: NgModule }
];

class SubscribeOptions {
}

class Message {
}

/*
 * Public API Surface of fsms-angular-pubsub
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Message, PubSubModule, PubSubService, SubscribeOptions };
//# sourceMappingURL=fsms-angular-pubsub.js.map
