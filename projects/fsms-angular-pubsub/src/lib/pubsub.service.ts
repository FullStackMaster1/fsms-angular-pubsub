import { Type } from '@angular/core';
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { IMessageSchema, IMessage } from './message';
import { SubscribeOptions } from './subscribe-options';

export type X = Array<IMessage>;
export interface IHandleMessage<M> {
  // subscribedTo(): Type<M>;

  handle(message: M, context: IMessageHandlerContext): void;
}

export interface IHandleMessages<MS extends X> {
  subscribedTo(): Type<IMessage>[];

  handle(message: IMessage): void;
}

const ServiceName = 'PubSub Service';
function throwError(msg: string) {
  throw new Error(`[${ServiceName}] => ${msg}`);
}

export interface MessageSubscription {
  unsubscribe();
}

@Injectable()
export class PubsubService implements IMessageHandlerContext {
  private map = new Map();
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
      throwError('Publish method must get event name.');
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

  protected getSubject(messageType: string): ReplaySubject<any> {
    return this.map.get(messageType);
  }

  protected hasSubject(messageType: string): boolean {
    return this.map.has(messageType);
  }

  protected setNewSubject(messageType: string): void {
    this.map.set(
      messageType,
      new ReplaySubject<{
        message: IMessage;
        context: IMessageHandlerContext;
      }>()
    );
  }
}

export interface IMessageHandlerContext {
  publish<V extends IMessage = IMessage>(message: V): void;
}
