import { Injectable } from '@angular/core';
import { Logger } from './contracts/definitions';

@Injectable()
export class TracingService {
  constructor(private logger: Logger) {}

  trace(message: string) {
    const timestamp = new Date().toISOString();
    this.logger.log('------');
    this.logger.log(`[Pubsub - ${timestamp}]: ${message}`);
    this.logger.log('------');
  }
}
