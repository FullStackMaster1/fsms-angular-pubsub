import { ErrorHandler } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from './message';

export type PubsubErrorHandler = <T extends Message>(
  observable$: Observable<T>,
  errorHandler: ErrorHandler
) => Observable<T>;

const MAX_NUMBER_OF_RETRY_ATTEMPTS = 10;

export function defaultPubsubsErrorHandler<T extends Message>(
  observable$: Observable<T>,
  errorHandler: ErrorHandler,
  retryAttemptLeft: number = MAX_NUMBER_OF_RETRY_ATTEMPTS
): Observable<T> {
  return observable$.pipe(
    catchError((error) => {
      if (errorHandler) { errorHandler.handleError(error); }
      if (retryAttemptLeft <= 1) {
        return observable$; // last attempt
      }
      // Return observable that produces this particular effect
      return defaultPubsubsErrorHandler(
        observable$,
        errorHandler,
        retryAttemptLeft - 1
      );
    })
  );
}
