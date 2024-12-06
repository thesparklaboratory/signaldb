import type { BaseItem } from '../Collection';
import type { Change } from './types';
/**
 * applies changes to a collection of items
 * @param items The items to apply the changes to
 * @param changes The changes to apply to the items
 * @returns The new items after applying the changes
 */
export default function applyChanges<ItemType extends BaseItem<IdType>, IdType>(items: ItemType[], changes: Change<ItemType, IdType>[]): ItemType[];
