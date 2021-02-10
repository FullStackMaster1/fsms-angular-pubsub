import { Injectable, OnDestroy } from '@angular/core';


import { Subscription } from 'rxjs';
import { PubsubService } from './pubsub.service';
import { PubsubSources } from './pubsub_sources';

@Injectable()
export class PubsubsRunner implements OnDestroy {
  private pubsubSubscription: Subscription | null = null;

  constructor(
    private effectSources: PubsubSources,
    private pubSubService: PubsubService
  ) {}

  start() {
    if (!this.pubsubSubscription) {
      // this.pubsubSubscription = this.effectSources
      //   .toActions()
      //   .subscribe(this.pubSubService);
    }
  }

  ngOnDestroy() {
    if (this.pubsubSubscription) {
      this.pubsubSubscription.unsubscribe();
      this.pubsubSubscription = null;
    }
  }
}
