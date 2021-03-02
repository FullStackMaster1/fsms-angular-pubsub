import { Injectable } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import {
  CallbackOptions,
  IMessageHandlerContext,
  Logger,
  PubsubSubscription,
} from '../contracts/pubsub-definitions';
import { IMessage } from '../contracts/message';
import { SubscribeOptions } from './subscribe-options';
import { TracingService } from '../tracing.service';

@Injectable()
export class PubsubService implements IMessageHandlerContext {
  constructor(private tracingService: TracingService) {}

  static ServiceName = 'PubSub Service';
  private map = new Map<string, ReplaySubject<CallbackOptions<IMessage>>>();
  private subscriptions: Subscription[] = [];

  subscribe({
    messageType,
    callback,
    error,
    complete,
  }: SubscribeOptions): PubsubSubscription {
    if (!this.hasSubject(messageType)) {
      this.setNewSubject(messageType);
    }

    const subject = this.getSubject(messageType);

    const subscription = subject
      .asObservable()
      .subscribe(callback, error, complete);

    this.tracingService.trace(`${messageType} is subscribed`);

    this.addSubscription(subscription);

    const unsubscribe = () => {
      this.tracingService.trace(`${messageType} is unsubscribed`);
      subscription.unsubscribe();
    };

    return { unsubscribe };
  }

  publish<V extends IMessage = IMessage>(message: V): void {
    if (!message) {
      this.throwError('Publish method must get event name');
    } else if (!this.hasSubject(message.messageType)) {
      return;
    }

    const context = this as IMessageHandlerContext;

    const subject = this.getSubject(message.messageType);

    this.tracingService.trace(`Publishing: ${message.messageType}`);

    this.tracingService.trace(
      `${subject.observers.length} subscribers found for: ${message.messageType}`
    );

    subject.next({ message, context });
  }

  clearAllSubscriptions(): void {
    this.subscriptions.forEach((s) => s && s.unsubscribe());
    this.subscriptions.length = 0;
    this.map.clear();

    this.tracingService.trace(`All subscriptions are cleared`);
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
