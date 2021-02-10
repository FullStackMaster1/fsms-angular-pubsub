export interface IMessage {
  type: string;
  payload?: any;
}

export interface IBaseMessage {
  new (): IMessage;
  messageType;
}

/* class decorator */
export function MessageDefinition<T>() {
  return <U extends T>(constructor: U) => constructor;
}
