import { Injector, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { Logger } from '../contracts/logger';
import { ReqresOptions } from './req-res-definitions';
import { PubsubService } from '../pubsub/pubsub.service';
import { DefaultLogger } from '../utils/default-logger';
import { TracingService } from '../utils/tracing.service';
import { DEFAULT_REQRES_OPTION } from './model';
import { ReqresRootModule } from './reqres-root-module';
import { ReqresSources } from './reqres-sources';
import { ROOT_REQRES, _ROOT_REQRES } from './reqres-tokens';

@NgModule()
export class ReqresModule {
  // static forFeature(
  //   featureReqresConfig: ReqresConfig
  // ): ModuleWithProviders<ReqresFeatureModule> {
  //   return {
  //     ngModule: ReqresFeatureModule,

  //     providers: [
  //       featureReqresConfig,
  //       {
  //         provide: _FEATURE_REQRES,
  //         multi: true,
  //         useValue: featureReqresConfig,
  //       },
  //       {
  //         provide: USER_PROVIDED_REQRES,
  //         multi: true,
  //         useValue: [],
  //       },
  //       {
  //         provide: FEATURE_REQRES,
  //         multi: true,
  //         useFactory: createReqress,
  //         deps: [Injector, _FEATURE_REQRES, USER_PROVIDED_REQRES],
  //       },
  //       PubsubService,
  //       ReqResSources,
  //       TracingService,
  //       { provide: Logger, useClass: DefaultLogger },
  //     ],
  //   };
  // }

  static forRoot(
    rootReqresConfig: ReqresOptions = DEFAULT_REQRES_OPTION
  ): ModuleWithProviders<ReqresRootModule> {
    return {
      ngModule: ReqresRootModule,
      providers: [
        {
          provide: _ROOT_REQRES,
          useValue: [
            rootReqresConfig.requestHandlers,
            rootReqresConfig.requestInterceptors,
            rootReqresConfig.responseInterceptors,
          ],
        },
        PubsubService,
        ReqresSources,
        TracingService,
        { provide: Logger, useClass: DefaultLogger },
        {
          provide: ROOT_REQRES,
          multi: true,
          useFactory: createReqress,
          deps: [Injector, _ROOT_REQRES],
        },
      ],
    };
  }
}

export function createReqress(
  injector: Injector,
  reqresGroups: Type<any>[][]
): any[] {
  const mergedReqress: Type<any>[] = [];

  for (const reqresGroup of reqresGroups) {
    mergedReqress.push(...reqresGroup);
  }

  return createReqresInstances(injector, mergedReqress);
}

export function createReqresInstances(
  injector: Injector,
  reqress: Type<any>[]
): any[] {
  return reqress.map((reqres) => injector.get(reqres));
}
