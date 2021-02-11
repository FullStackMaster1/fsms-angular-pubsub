import { Injectable } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import {
  CallbackOptions,
  IMessageHandlerContext,
} from './contracts/definitions';
import { IMessage } from './message';
import { SubscribeOptions } from './subscribe-options';

@Injectable()
export class PubsubService implements IMessageHandlerContext {
  static ServiceName = 'PubSub Service';
  private map = new Map<string, ReplaySubject<CallbackOptions<IMessage>>>();
  private subscriptions: Subscription[] = [];

  subscribe({
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

  publish<V extends IMessage = IMessage>(message: V): void {
    if (!message) {
      this.throwError('Publish method must get event name.');
    } else if (!this.hasSubject(message.messageType)) {
      return;
    }

    const context = this as IMessageHandlerContext;

    this.getSubject(message.messageType).next({ message, context });
  }

  clearAllSubscriptions(): void {
    this.subscriptions.forEach((s) => s && s.unsubscribe());
    this.subscriptions.length = 0;
    this.map.clear();
  }

  protected addSubscription(sub: Subscription): void {
    this.subscriptions.push(sub);
  }

  protected getSubject(messageType: string) {
    return this.map.get(messageType);
  }

  protected hasSubject(messageType: string): boolean {
    return this.map.has(messageType);
  }

  protected setNewSubject(messageType: string): void {
    this.map.set(messageType, new ReplaySubject<CallbackOptions<IMessage>>());
  }

  private throwError(msg: string) {
    throw new Error(`[${PubsubService.ServiceName}] => ${msg}`);
  }
}
