import { Injectable, OnDestroy } from '@angular/core';
import { IHandleMessage, ReqresSubscription } from '@fsms/angular-reqres';
import { ReqresService } from '../reqres/reqres.service';
import { IMessageSchema } from '../contracts/message';


@Injectable()
export class ReqResSources implements OnDestroy {
  constructor(private readonly reqresService: ReqresService) {}

  private allReqresInstances = [];

  private subscriptions: ReqresSubscription[] = [];

  addReqRes(reqresInstance: any): void {
    this.allReqresInstances.push(reqresInstance);
  }

  addReqResList(rootReqress: any[]) {
    rootReqress.forEach((reqresInstance) => this.addReqRes(reqresInstance));
  }

  getAllReqresInstances() {
    return this.allReqresInstances;
  }

  subscribe() {
    const allReqresInstances = this.getAllReqresInstances();

    allReqresInstances.forEach((h: IHandleMessage<any>) => {
      const z = getReqresDecoratorMetadata(h);

      z.messages.forEach((m: IMessageSchema) => {
        this.subscriptions.push(
          this.reqresService.subscribe({
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
