import { Type } from '@angular/core';
import { IMessage } from '../contracts/message';

export interface ReqresOptions {
  requestHandlers: Type<any>[];
  responseInterceptors: Type<any>[];
  requestInterceptors: Type<any>[];
}

export interface ReqresConfig {
  messages: Type<IMessage>[];
}

export type ComposedRequest = any | undefined;
export type ComposedResponse = any | undefined;
export abstract class Dictionary<T> {
  [id: string]: T | undefined;
}
