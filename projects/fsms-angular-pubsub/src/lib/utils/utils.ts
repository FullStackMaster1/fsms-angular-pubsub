import { ReqresConfig } from '../reqres/req-res-definitions';

export function getSourceForInstance<T>(instance: T): T {
  return Object.getPrototypeOf(instance);
}

export function getDecoratorMetadata<T, V>(instance: T, key: string): V {
  const y = getSourceForInstance(instance);
  return y.constructor[key] as V;
}
