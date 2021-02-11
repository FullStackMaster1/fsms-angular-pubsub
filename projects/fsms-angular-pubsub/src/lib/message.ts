export interface IMessage {
  messageType: string;
  payload?: any;
}

export interface IMessageSchema {
  new (): IMessage;
  messageType;
}

/* class decorator */
export function DefineMessage<T>() {
  return <U extends T>(constructor: U) => constructor;
}
