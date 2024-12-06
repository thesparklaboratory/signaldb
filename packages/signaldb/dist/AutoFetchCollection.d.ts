import type { BaseItem } from './Collection';
import type { ReplicatedCollectionOptions } from './ReplicatedCollection';
import ReplicatedCollection from './ReplicatedCollection';
import type Selector from './types/Selector';
interface AutoFetchOptions<T extends {
    id: I;
} & Record<string, any>, I> {
    fetchQueryItems: (selector: Selector<T>) => ReturnType<ReplicatedCollectionOptions<T, I>['pull']>;
    purgeDelay?: number;
    registerRemoteChange?: (onChange: () => Promise<void>) => Promise<void>;
    mergeItems?: (itemA: T, itemB: T) => T;
}
export type AutoFetchCollectionOptions<T extends BaseItem<I>, I, U = T> = Omit<ReplicatedCollectionOptions<T, I, U>, 'pull' | 'registerRemoteChange'> & AutoFetchOptions<T, I>;
/**
 * @summary A special collection that automatically fetches items when they are needed.
 */
export default class AutoFetchCollection<T extends BaseItem<I> = BaseItem, I = any, U = T> extends ReplicatedCollection<T, I, U> {
    private activeObservers;
    private observerTimeouts;
    private purgeDelay;
    private idQueryCache;
    private itemsCache;
    private fetchQueryItems;
    private triggerReload;
    private reactivityAdapter;
    private loadingSignals;
    private isFetchingSignal;
    private mergeItems;
    /**
     * @param options {Object} - Options for the collection.
     * @param options.fetchQueryItems {Function} - A function that fetches items from the server. It takes the selector as an argument and returns a promise that resolves to an object with an `items` property.
     * @param options.purgeDelay {Number} - The delay in milliseconds before purging an item from the cache.
     */
    constructor(options: AutoFetchCollectionOptions<T, I, U>);
    /**
     * @summary Registers a query manually that items should be fetched for it
     * @param selector {Object} Selector of the query
     */
    registerQuery(selector: Selector<T>): void;
    /**
     * @summary Unregisters a query manually that items are not fetched anymore for it
     * @param selector {Object} Selector of the query
     */
    unregisterQuery(selector: Selector<T>): void;
    private getKeyForSelector;
    private forceRefetch;
    private fetchSelector;
    private handleObserverCreation;
    private handleObserverDisposal;
    private ensureSignal;
    private setLoading;
    /**
     * @summary Indicates wether a query is currently been loaded
     * @param selector {Object} Selector of the query
     * @returns The loading state
     */
    isLoading(selector?: Selector<T>): boolean;
}
export {};
