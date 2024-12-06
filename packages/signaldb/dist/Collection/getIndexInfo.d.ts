import type IndexProvider from '../types/IndexProvider';
import type { FlatSelector } from '../types/Selector';
import type Selector from '../types/Selector';
import type { BaseItem } from './types';
export declare function getMergedIndexInfo<T extends BaseItem<I> = BaseItem, I = any>(indexProviders: IndexProvider<T, I>[], selector: FlatSelector<T>): {
    matched: boolean;
    positions: number[];
    optimizedSelector: FlatSelector<T>;
};
export default function getIndexInfo<T extends BaseItem<I> = BaseItem, I = any>(indexProviders: IndexProvider<T, I>[], selector: Selector<T>): {
    matched: boolean;
    positions: number[];
    optimizedSelector: Selector<T>;
};
