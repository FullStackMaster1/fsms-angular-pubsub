import { Injectable } from '@angular/core';
import { IMessage } from '../contracts/message';
import { ReqresSources } from './reqres-sources';

@Injectable()
export class ReqresService {
  constructor(private readonly sources: ReqresSources) {}
  request(message: IMessage) {
    this.sources.
  }
}
