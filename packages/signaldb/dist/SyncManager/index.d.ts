import type { BaseItem } from '../Collection/types';
import type { Changeset, LoadResponse } from '../types/PersistenceAdapter';
import Collection from '../Collection';
import PromiseQueue from '../utils/PromiseQueue';
import type PersistenceAdapter from '../types/PersistenceAdapter';
import type ReactivityAdapter from '../types/ReactivityAdapter';
import type { Change, Snapshot, SyncOperation } from './types';
type SyncOptions<T extends Record<string, any>> = {
    name: string;
} & T;
interface Options<CollectionOptions extends Record<string, any>, ItemType extends BaseItem<IdType> = BaseItem, IdType = any> {
    pull: (collectionOptions: SyncOptions<CollectionOptions>, pullParameters: {
        lastFinishedSyncStart?: number;
        lastFinishedSyncEnd?: number;
    }) => Promise<LoadResponse<ItemType>>;
    push: (collectionOptions: SyncOptions<CollectionOptions>, pushParameters: {
        changes: Changeset<ItemType>;
    }) => Promise<void>;
    registerRemoteChange?: (collectionOptions: SyncOptions<CollectionOptions>, onChange: (data?: LoadResponse<ItemType>) => Promise<void>) => void;
    id?: string;
    persistenceAdapter?: (id: string, registerErrorHandler: (handler: (error: Error) => void) => void) => PersistenceAdapter<any, any>;
    reactivity?: ReactivityAdapter;
    onError?: (collectionOptions: SyncOptions<CollectionOptions>, error: Error) => void;
}
/**
 * Class to manage syncing of collections.
 * @template CollectionOptions
 * @template ItemType
 * @template IdType
 * @example
 * const syncManager = new SyncManager({
 *    pull: async (collectionOptions) => {
 *      const response = await fetch(`/api/collections/${collectionOptions.name}`)
 *      return await response.json()
 *    },
 *    push: async (collectionOptions, { changes }) => {
 *      await fetch(`/api/collections/${collectionOptions.name}`, {
 *        method: 'POST',
 *        body: JSON.stringify(changes),
 *      })
 *    },
 *  })
 *
 *  const collection = new Collection()
 *  syncManager.addCollection(collection, {
 *    name: 'todos',
 *  })
 *
 *  syncManager.sync('todos')
 */
export default class SyncManager<CollectionOptions extends Record<string, any>, ItemType extends BaseItem<IdType> = BaseItem, IdType = any> {
    protected options: Options<CollectionOptions, ItemType, IdType>;
    protected collections: Map<string, [
        Collection<ItemType, IdType, any>,
        SyncOptions<CollectionOptions>
    ]>;
    protected changes: Collection<Change<ItemType>, string>;
    protected snapshots: Collection<Snapshot<ItemType>, string>;
    protected syncOperations: Collection<SyncOperation, string>;
    protected remoteChanges: Omit<Change, 'id' | 'time'>[];
    protected syncQueues: Map<string, PromiseQueue>;
    protected persistenceReady: Promise<void>;
    protected isDisposed: boolean;
    protected instanceId: string;
    /**
     * @param options Collection options
     * @param options.pull Function to pull data from remote source.
     * @param options.push Function to push data to remote source.
     * @param [options.registerRemoteChange] Function to register a callback for remote changes.
     * @param [options.id] Unique identifier for this sync manager. Only nessesary if you have multiple sync managers.
     * @param [options.persistenceAdapter] Persistence adapter to use for storing changes, snapshots and sync operations.
     * @param [options.reactivity] Reactivity adapter to use for reactivity.
     * @param [options.onError] Function to handle errors that occur async during syncing.
     */
    constructor(options: Options<CollectionOptions, ItemType, IdType>);
    protected getSyncQueue(name: string): PromiseQueue;
    /**
     * Clears all internal data structures
     */
    dispose(): Promise<void>;
    /**
     * Gets a collection with it's options by name
     * @param name Name of the collection
     * @throws Will throw an error if the name wasn't found
     * @returns Tuple of collection and options
     */
    getCollection(name: string): [Collection<ItemType, IdType, any>, SyncOptions<CollectionOptions>];
    /**
     * Adds a collection to the sync manager.
     * @param collection Collection to add
     * @param options Options for the collection. The object needs at least a `name` property.
     * @param options.name Unique name of the collection
     */
    addCollection(collection: Collection<ItemType, IdType, any>, options: SyncOptions<CollectionOptions>): void;
    protected deboucedPush: (name: string) => void;
    protected schedulePush(name: string): void;
    /**
     * Starts the sync process for all collections
     */
    syncAll(): Promise<void>;
    /**
     * Checks if a collection is currently beeing synced
     * @param [name] Name of the collection. If not provided, it will check if any collection is currently beeing synced.
     * @returns True if the collection is currently beeing synced, false otherwise.
     */
    isSyncing(name?: string): boolean;
    /**
     * Checks if the sync manager is ready to sync.
     * @returns A promise that resolves when the sync manager is ready to sync.
     */
    isReady(): Promise<void>;
    /**
     * Starts the sync process for a collection
     * @param name Name of the collection
     * @param options Options for the sync process.
     * @param options.force If true, the sync process will be started even if there are no changes and onlyWithChanges is true.
     * @param options.onlyWithChanges If true, the sync process will only be started if there are changes.
     */
    sync(name: string, options?: {
        force?: boolean;
        onlyWithChanges?: boolean;
    }): Promise<void>;
    /**
     * Starts the push process for a collection (sync process but only if there are changes)
     * @param name Name of the collection
     */
    pushChanges(name: string): Promise<void>;
    protected syncWithData(name: string, data: LoadResponse<ItemType>): Promise<void>;
}
export {};
