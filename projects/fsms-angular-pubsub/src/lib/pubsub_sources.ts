import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PubsubErrorHandler } from './pubsub_error_handler';
import { PUBSUB_ERROR_HANDLER } from './tokens';

@Injectable()
export class PubsubSources extends Subject<any> {
  constructor(
    private errorHandler: ErrorHandler,
    @Inject(PUBSUB_ERROR_HANDLER)
    private pubsubsErrorHandler: PubsubErrorHandler
  ) {
    super();
  }

  addPubSub(pubsubSourceInstance: any): void {
    this.next(pubsubSourceInstance);
  }
}
