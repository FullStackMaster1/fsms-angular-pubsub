// tslint:disable: ban-types

import { ReqResConfig } from '../contracts/req-res-definitions';


export const DEFAULT_REQRES_CONFIG: Readonly<Required<ReqResConfig>> = {
  messages: [],
  useTracing: true,
};
