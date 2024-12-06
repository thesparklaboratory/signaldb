import type { BaseItem } from '../Collection/types';
import type Modifier from '../types/Modifier';
import type { Changeset, LoadResponse } from '../types/PersistenceAdapter';
import type { Change } from './types';
interface Options<ItemType extends BaseItem<IdType>, IdType> {
    changes: Change<ItemType, IdType>[];
    lastSnapshot?: ItemType[];
    data: LoadResponse<ItemType>;
    pull: () => Promise<LoadResponse<ItemType>>;
    push: (changes: Changeset<ItemType>) => Promise<void>;
    insert: (item: ItemType) => void;
    update: (id: IdType, modifier: Modifier<ItemType>) => void;
    remove: (id: IdType) => void;
    batch: (fn: () => void) => void;
}
/**
 * Does a sync operation based on the provided options. If changes are supplied, these will be rebased on the new data.
 * Afterwards the push method will be called with the remaining changes. A new snapshot will be created and returned.
 * @param options Sync options
 * @param options.changes Changes to call the push method with
 * @param [options.lastSnapshot] The last snapshot
 * @param options.data The new data
 * @param options.pull Method to pull new data
 * @param options.push Method to push changes
 * @param options.insert Method to insert an item
 * @param options.update Method to update an item
 * @param options.remove Method to remove an item
 * @param options.batch Method to batch multiple operations
 * @returns The new snapshot
 */
export default function sync<ItemType extends BaseItem<IdType>, IdType>({ changes, lastSnapshot, data, pull, push, insert, update, remove, batch, }: Options<ItemType, IdType>): Promise<ItemType[]>;
export {};
