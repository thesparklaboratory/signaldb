import Collection from './Collection';
import type { BaseItem, CollectionOptions } from './Collection';
import type { Changeset, LoadResponse } from './types/PersistenceAdapter';
interface ReplicationOptions<T extends {
    id: I;
} & Record<string, any>, I> {
    pull: () => Promise<LoadResponse<T>>;
    push?(changes: Changeset<T>, items: T[]): Promise<void>;
    registerRemoteChange?: (onChange: (data?: LoadResponse<T>) => void | Promise<void>) => Promise<void>;
}
export declare function createReplicationAdapter<T extends {
    id: I;
} & Record<string, any>, I>(options: ReplicationOptions<T, I>): import("./types/PersistenceAdapter").default<T, unknown>;
export type ReplicatedCollectionOptions<T extends BaseItem<I>, I, U = T> = CollectionOptions<T, I, U> & ReplicationOptions<T, I>;
export default class ReplicatedCollection<T extends BaseItem<I> = BaseItem, I = any, U = T> extends Collection<T, I, U> {
    private isPullingRemoteSignal;
    private isPushingRemoteSignal;
    constructor(options: ReplicatedCollectionOptions<T, I, U>);
    isLoading(): boolean;
}
export {};
