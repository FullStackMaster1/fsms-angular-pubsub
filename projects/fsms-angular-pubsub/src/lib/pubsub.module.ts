
import { ModuleWithProviders, NgModule } from '@angular/core';
import { PubSubService } from './pubsub.service';

@NgModule()
export class PubSubModule {
  public static forRoot(): ModuleWithProviders<PubSubModule> {
    return {
      ngModule: PubSubModule,
      providers: [
        PubSubService
      ]
    };
  }
}
