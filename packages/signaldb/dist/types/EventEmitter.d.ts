import { EventEmitter as BaseEventEmitter } from 'events';
export default class EventEmitter<Events extends Record<string | symbol, any>> extends BaseEventEmitter {
    on<K extends keyof Events>(event: K, listener: Events[K]): this;
    emit<K extends keyof Events>(event: K, ...args: Parameters<Events[K]>): boolean;
}
