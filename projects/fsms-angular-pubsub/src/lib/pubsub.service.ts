import { Type } from '@angular/core';
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { Message } from './message';
import { SubscribeOptions } from './subscribe-options';

type T = Array<Message>;
export abstract class BaseMessageHandler<R extends T> {
  get Messages() {
    return 'xdescribe';
  }

  constructor() {}
}

const ServiceName = 'PubSub Service';
function throwError(msg: string) {
  throw new Error(`[${ServiceName}] => ${msg}`);
}
@Injectable()
export class PubsubService {
  private map = new Map();
  private subscriptions: Subscription[] = [];

  public subscribe({
    messageType,
    callback,
    error,
    complete,
  }: SubscribeOptions): Subscription {
    if (!this.hasSubject(messageType)) {
      this.setNewSubject(messageType);
    }

    const subject = this.getSubject(messageType);

    const subscription = subject
      .asObservable()
      .subscribe(callback, error, complete);

    this.addSubscription(subscription);

    return subscription;
  }

  public publish<V extends Message = Message>(message: V): void {
    if (!message) {
      throwError('Publish method must get event name.');
    } else if (!this.hasSubject(message.type)) {
      return;
    }

    this.getSubject(message.type).next(message);
  }

  clearAllSubscriptions(): void {
    this.subscriptions.forEach((s) => s && s.unsubscribe());
    this.subscriptions.length = 0;
    this.map.clear();
  }

  private addSubscription(sub: Subscription): void {
    this.subscriptions.push(sub);
  }

  private getSubject(messageType: string): ReplaySubject<any> {
    return this.map.get(messageType);
  }

  private hasSubject(messageType: string): boolean {
    return this.map.has(messageType);
  }

  private setNewSubject(messageType: string): void {
    this.map.set(messageType, new ReplaySubject<any>());
  }
}
