import { Injectable, OnDestroy } from '@angular/core';
import { IHandleMessage, PubsubSubscription } from '@fsms/angular-pubsub';
import { IMessageSchema } from '../contracts/message';
import { getPubsubDecoratorMetadata } from './pubsub-metadata';
import { PubsubService } from './pubsub.service';

@Injectable()
export class PubsubSources implements OnDestroy {
  constructor(private readonly pubsubService: PubsubService) {}

  private allPubsubInstances = [];

  private subscriptions: PubsubSubscription[] = [];

  addPubsub(pubsubInstance: any): void {
    this.allPubsubInstances.push(pubsubInstance);
  }

  addPubsubs(rootPubsubs: any[]) {
    rootPubsubs.forEach((pubsubInstance) => this.addPubsub(pubsubInstance));
  }

  getAllPubsubInstances() {
    return this.allPubsubInstances;
  }

  subscribe() {
    const allPubsubInstances = this.getAllPubsubInstances();

    allPubsubInstances.forEach((h: IHandleMessage<any>) => {
      const z = getPubsubDecoratorMetadata(h);

      z.messages.forEach((m: IMessageSchema) => {
        this.subscriptions.push(
          this.pubsubService.subscribe({
            messageType: m.messageType,
            callback: h.handle.bind(h) as any,
          })
        );
      });
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
