import type ReactivityAdapter from '../types/ReactivityAdapter';
import type { BaseItem, FindOptions, Transform } from './types';
import type { ObserveCallbacks } from './Observer';
export declare function isInReactiveScope(reactivity: ReactivityAdapter | undefined | false): boolean;
export interface CursorOptions<T extends BaseItem, U = T> extends FindOptions<T> {
    transform?: Transform<T, U>;
    bindEvents?: (requery: () => void) => () => void;
}
export default class Cursor<T extends BaseItem, U = T> {
    private observer;
    private getFilteredItems;
    private options;
    private onCleanupCallbacks;
    constructor(getItems: () => T[], options?: CursorOptions<T, U>);
    private addGetters;
    private transform;
    private getItems;
    private depend;
    private ensureObserver;
    private observeRawChanges;
    cleanup(): void;
    onCleanup(callback: () => void): void;
    forEach(callback: (item: U) => void): void;
    map<V>(callback: (item: U) => V): V[];
    fetch(): U[];
    count(): number;
    observeChanges(callbacks: ObserveCallbacks<U>, skipInitial?: boolean): () => void;
    requery(): void;
}
