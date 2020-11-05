import { Injectable } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { Message } from './message';
import { SubscribeOptions } from './subscribe-options';

const ServiceName: string = 'PubSub Service';
@Injectable()
export class PubSubService {
  private map = new Map();
  private subscriptions: Subscription[] = [];

  public subscribe({
    message,
    callback,
    error,
    complete,
  }: SubscribeOptions): Subscription {
    if (!message) {
      throw new Error(
        `[${ServiceName}] => Subscription method must get event name.`
      );
    }

    const messageType = message.type;

    if (!this.hasSubject(messageType)) {
      this.setNewSubject(messageType);
    }

    let subject = this.getSubject(messageType);

    if (typeof callback !== 'function') {
      return subject.asObservable();
    } else {
      const subscription = subject
        .asObservable()
        .subscribe(callback, error, complete);

      this.addSubscription(subscription);

      return subscription;
    }
  }

  public publish(message: Message) {
    if (!message) {
      throw new Error(
        `[${ServiceName}] => Publish method must get event name.`
      );
    } else if (!this.hasSubject(message.type)) {
      return;
    }

    this.getSubject(message.type).next(message);
  }

  clearAllSubscriptions() {
    this.subscriptions.forEach((s) => s && s.unsubscribe());
    this.subscriptions.length = 0;
    this.map.clear();
  }

  private addSubscription(sub: Subscription) {
    this.subscriptions.push(sub);
  }

  private getSubject(messageType: string) {
    return this.map.get(messageType);
  }

  private hasSubject(messageType: string) {
    return this.map.has(messageType);
  }

  private setNewSubject(messageType: string) {
    this.map.set(messageType, new ReplaySubject<any>());
  }
}
