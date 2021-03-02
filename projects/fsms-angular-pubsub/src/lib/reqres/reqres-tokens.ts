import { InjectionToken, Type } from '@angular/core';

export const _ROOT_REQRES_GUARD = new InjectionToken<void>(
  '@fsms/reqres Internal Root Guard'
);
export const USER_PROVIDED_REQRES = new InjectionToken<Type<any>[][]>(
  '@fsms/reqres User Provided ReqRes'
);
export const _ROOT_REQRES = new InjectionToken<Type<any>[]>(
  '@fsms/reqres Internal Root ReqRes'
);
export const ROOT_REQRES = new InjectionToken<Type<any>[]>(
  '@fsms/reqres Root ReqRes'
);
export const _FEATURE_REQRES = new InjectionToken<Type<any>[]>(
  '@fsms/reqres Internal Feature ReqRes'
);
export const FEATURE_REQRES = new InjectionToken<any[][]>(
  '@fsms/reqres Feature ReqRes'
);

export const METADATA_KEY = '__@fsms/reqres__';

export const ROOT_REQRES_INIT = '@fsms/reqres/init';
