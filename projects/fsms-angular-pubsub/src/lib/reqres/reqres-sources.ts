import { Injectable, OnDestroy } from '@angular/core';
import { Dictionary, ReqresConfig } from './req-res-definitions';
import { getPubsubDecoratorMetadata } from '../pubsub/pubsub-metadata';
import { PubsubService } from '../pubsub/pubsub.service';
import { getDecoratorMetadata } from '../utils';


@Injectable()
export class ReqresSources implements OnDestroy {
  constructor(private readonly reqresService: PubsubService) {}

  private allReqresInstances : Dictionary<any> = [];
  private allRequestInterceptors = [];
  private allResponseInterceptors = [];
  private allRequestHandlers = [];

  // private subscriptions: ReqresSubscription[] = [];

  addRequestInterceptor(requestInterceptorInstance: any): void {

    const config = getDecoratorMetadata<any, ReqresConfig>(requestInterceptorInstance, );
    config.requestHandlers
  }


  addRequestInterceptorList(requestInterceptorInstance: any[]) {
    requestInterceptorInstance.forEach((reqresInstance) =>
      this.addRequestInterceptor(reqresInstance)
    );
  }

  getAllReqresInstances() {
    return this.allReqresInstances;
  }

  subscribe() {
    const allReqresInstances = this.getAllReqresInstances();

    // allReqresInstances.forEach((h: IHandleMessage<any>) => {
    //   const z = getReqresDecoratorMetadata(h);

    //   z.messages.forEach((m: IMessageSchema) => {
    //     this.subscriptions.push(
    //       this.reqresService.subscribe({
    //         messageType: m.messageType,
    //         callback: h.handle.bind(h) as any,
    //       })
    //     );
    //   });
    // });
  }

  ngOnDestroy(): void {
    //   this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
