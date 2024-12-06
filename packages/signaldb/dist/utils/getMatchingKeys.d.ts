import type { BaseItem } from '../Collection/types';
import type { FlatSelector } from '../types/Selector';
export default function getMatchingKeys<T extends BaseItem<I> = BaseItem, I = any>(field: string, selector: FlatSelector<T>): string[] | null;
