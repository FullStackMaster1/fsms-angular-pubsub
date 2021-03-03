import { Injector, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { Logger } from '../contracts/Logger';
import { PubsubService } from '../pubsub/pubsub.service';
import { TracingService } from '../tracing.service';
import { DefaultLogger } from '../utils/default-logger';
import { ReqresRootModule } from './reqres-root-module';
import { ReqResSources } from './reqres-sources';
import {
  FEATURE_REQRES,
  ROOT_REQRES,
  USER_PROVIDED_REQRES,
  _FEATURE_REQRES,
  _ROOT_REQRES,
} from './reqres-tokens';
import { ReqresFeatureModule } from './reqrest-feature-module';

export interface ReqresPonseConfig {
  requestHandlers: Type<any>[];
  responseInterceptors: Type<any>[];
  requestInterceptors: Type<any>[];
}

@NgModule()
export class ReqresModule {
  // static forFeature(
  //   featureReqresConfig: ReqresPonseConfig
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
    rootReqresConfig: ReqresPonseConfig
  ): ModuleWithProviders<ReqresRootModule> {
    return {
      ngModule: ReqresRootModule,
      providers: [
        {
          provide: _ROOT_REQRES,
          useValue: rootReqresConfig.requestHandlers,
        },
        PubsubService,
        ReqResSources,
        TracingService,
        { provide: Logger, useClass: DefaultLogger },
      ],
    };
  }
}

export function createReqress(
  injector: Injector,
  reqresGroups: Type<any>[][],
  userProvidedEffectGroups: Type<any>[][]
): any[] {
  const mergedReqress: Type<any>[] = [];

  for (const reqresGroup of reqresGroups) {
    mergedReqress.push(...reqresGroup);
  }

  for (const userProvidedReqressGroup of userProvidedEffectGroups) {
    mergedReqress.push(...userProvidedReqressGroup);
  }

  return createReqresInstances(injector, mergedReqress);
}

export function createReqresInstances(
  injector: Injector,
  reqress: Type<any>[]
): any[] {
  return reqress.map((reqres) => injector.get(reqres));
}
