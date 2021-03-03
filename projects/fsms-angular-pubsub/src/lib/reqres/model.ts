// tslint:disable: ban-types

import { ReqresConfig, ReqresOptions } from './req-res-definitions';

export const DEFAULT_REQRES_OPTION: Readonly<Required<ReqresOptions>> = {
  requestHandlers: [],
  responseInterceptors: [],
  requestInterceptors: [],
};

export const DEFAULT_REQRES_META_CONFIG: Readonly<Required<ReqresConfig>> = {
  messages: [],
};
