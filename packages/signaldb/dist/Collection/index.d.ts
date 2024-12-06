import type MemoryAdapter from '../types/MemoryAdapter';
import type ReactivityAdapter from '../types/ReactivityAdapter';
import type PersistenceAdapter from '../types/PersistenceAdapter';
import EventEmitter from '../types/EventEmitter';
import type Selector from '../types/Selector';
import type Modifier from '../types/Modifier';
import type IndexProvider from '../types/IndexProvider';
import Cursor from './Cursor';
import type { BaseItem, FindOptions, Transform } from './types';
export type { BaseItem, Transform, SortSpecifier, FieldSpecifier, FindOptions } from './types';
export type { CursorOptions } from './Cursor';
export type { ObserveCallbacks } from './Observer';
export { default as createIndex } from './createIndex';
export interface CollectionOptions<T extends BaseItem<I>, I, U = T> {
    memory?: MemoryAdapter;
    reactivity?: ReactivityAdapter;
    transform?: Transform<T, U>;
    persistence?: PersistenceAdapter<T, I>;
    indices?: IndexProvider<T, I>[];
    enableDebugMode?: boolean;
}
interface CollectionEvents<T extends BaseItem, U = T> {
    added: (item: T) => void;
    changed: (item: T, modifier: Modifier<T>) => void;
    removed: (item: T) => void;
    'persistence.init': () => void;
    'persistence.error': (error: Error) => void;
    'persistence.transmitted': () => void;
    'persistence.received': () => void;
    'persistence.pullStarted': () => void;
    'persistence.pullCompleted': () => void;
    'persistence.pushStarted': () => void;
    'persistence.pushCompleted': () => void;
    'observer.created': <O extends FindOptions<T>>(selector?: Selector<T>, options?: O) => void;
    'observer.disposed': <O extends FindOptions<T>>(selector?: Selector<T>, options?: O) => void;
    getItems: (selector: Selector<T> | undefined) => void;
    find: <O extends FindOptions<T>>(selector: Selector<T> | undefined, options: O | undefined, cursor: Cursor<T, U>) => void;
    findOne: <O extends FindOptions<T>>(selector: Selector<T>, options: O | undefined, item: U | undefined) => void;
    insert: (item: Omit<T, 'id'> & Partial<Pick<T, 'id'>>) => void;
    updateOne: (selector: Selector<T>, modifier: Modifier<T>) => void;
    updateMany: (selector: Selector<T>, modifier: Modifier<T>) => void;
    removeOne: (selector: Selector<T>) => void;
    removeMany: (selector: Selector<T>) => void;
    '_debug.getItems': (callstack: string, selector: Selector<T> | undefined, measuredTime: number) => void;
    '_debug.find': <O extends FindOptions<T>>(callstack: string, selector: Selector<T> | undefined, options: O | undefined, cursor: Cursor<T, U>) => void;
    '_debug.findOne': <O extends FindOptions<T>>(callstack: string, selector: Selector<T>, options: O | undefined, item: U | undefined) => void;
    '_debug.insert': (callstack: string, item: Omit<T, 'id'> & Partial<Pick<T, 'id'>>) => void;
    '_debug.updateOne': (callstack: string, selector: Selector<T>, modifier: Modifier<T>) => void;
    '_debug.updateMany': (callstack: string, selector: Selector<T>, modifier: Modifier<T>) => void;
    '_debug.removeOne': (callstack: string, selector: Selector<T>) => void;
    '_debug.removeMany': (callstack: string, selector: Selector<T>) => void;
}
export default class Collection<T extends BaseItem<I> = BaseItem, I = any, U = T> extends EventEmitter<CollectionEvents<T, U>> {
    static collections: Collection<any, any>[];
    static debugMode: boolean;
    static batchOperationInProgress: boolean;
    static enableDebugMode: () => void;
    static batch(callback: () => void): void;
    private options;
    private persistenceAdapter;
    private isPullingSignal;
    private isPushingSignal;
    private indexProviders;
    private indicesOutdated;
    private idIndex;
    private debugMode;
    private batchOperationInProgress;
    private isDisposed;
    private postBatchCallbacks;
    constructor(options?: CollectionOptions<T, I, U>);
    isPulling(): boolean;
    isPushing(): boolean;
    isLoading(): boolean;
    getDebugMode(): boolean;
    setDebugMode(enable: boolean): void;
    private profile;
    private executeInDebugMode;
    private rebuildIndices;
    private rebuildAllIndices;
    private getIndexInfo;
    private getItemAndIndex;
    private deleteFromIdIndex;
    private memory;
    private memoryArray;
    private transform;
    private getItems;
    /**
     * Disposes the collection, runs the dispose method of the persistence adapter
     * and clears all internal data structures.
     */
    dispose(): Promise<void>;
    find<O extends FindOptions<T>>(selector?: Selector<T>, options?: O): Cursor<T, U>;
    findOne<O extends Omit<FindOptions<T>, 'limit'>>(selector: Selector<T>, options?: O): NonNullable<U> | undefined;
    batch(callback: () => void): void;
    insert(item: Omit<T, 'id'> & Partial<Pick<T, 'id'>>): I;
    insertMany(items: Array<Omit<T, 'id'> & Partial<Pick<T, 'id'>>>): I[];
    updateOne(selector: Selector<T>, modifier: Modifier<T>): 0 | 1;
    updateMany(selector: Selector<T>, modifier: Modifier<T>): number;
    removeOne(selector: Selector<T>): 0 | 1;
    removeMany(selector: Selector<T>): number;
}
