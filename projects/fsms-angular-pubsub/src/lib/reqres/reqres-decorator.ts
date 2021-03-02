// tslint:disable: ban-types

import { ReqResConfig } from '../contracts/req-res-definitions';
import { DEFAULT_REQRES_CONFIG } from './model';
import { METADATA_KEY } from './reqres-tokens';

export function RequestHandler(config: ReqResConfig): ClassDecorator {
  return <T extends Object>(target: T) => {
    const metadata: ReqResConfig = {
      ...DEFAULT_REQRES_CONFIG,
      ...config,
    };
    Object.defineProperty(target, METADATA_KEY, {
      value: metadata,
    });
  };
}
