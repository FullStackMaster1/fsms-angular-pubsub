// tslint:disable: ban-types

import { DEFAULT_REQRES_META_CONFIG } from './model';
import { ReqresConfig } from './req-res-definitions';
import {
  REQUESTHANDLER_METADATA_KEY,
  REQUESTINTERCEPTOR_METADATA_KEY,
  RESPONSEINTERCEPTOR_METADATA_KEY,
} from './reqres-tokens';

export function RequestHandler(config: ReqresConfig): ClassDecorator {
  return <T extends Object>(target: T) => {
    const metadata: ReqresConfig = {
      ...DEFAULT_REQRES_META_CONFIG,
      ...config,
    };
    Object.defineProperty(target, REQUESTHANDLER_METADATA_KEY, {
      value: metadata,
    });
  };
}

export function ResponseInterceptor(config: ReqresConfig): ClassDecorator {
  return <T extends Object>(target: T) => {
    const metadata: ReqresConfig = {
      ...DEFAULT_REQRES_META_CONFIG,
      ...config,
    };
    Object.defineProperty(target, RESPONSEINTERCEPTOR_METADATA_KEY, {
      value: metadata,
    });
  };
}

export function RequestInterceptor(config: ReqresConfig): ClassDecorator {
  return <T extends Object>(target: T) => {
    const metadata: ReqresConfig = {
      ...DEFAULT_REQRES_META_CONFIG,
      ...config,
    };
    Object.defineProperty(target, REQUESTINTERCEPTOR_METADATA_KEY, {
      value: metadata,
    });
  };
}
