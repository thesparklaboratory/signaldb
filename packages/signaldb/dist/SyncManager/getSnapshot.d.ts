import type { BaseItem } from '../Collection';
import type { LoadResponse } from '../types/PersistenceAdapter';
/**
 * Gets the snapshot of items from the last snapshot and the changes.
 * @param lastSnapshot The last snapshot of items
 * @param data The changes to apply to the last snapshot
 * @returns The new snapshot of items
 */
export default function getSnapshot<ItemType extends BaseItem<IdType>, IdType>(lastSnapshot: ItemType[] | undefined, data: LoadResponse<ItemType>): ItemType[];
