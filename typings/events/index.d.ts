
declare module 'events' {
  export default class EventEmitter {
    on(eventName: string, handler: (...args: {}[]) => void): void;
    emit(eventName: string, ...args: {}[]): void;
  }
}
