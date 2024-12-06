import type IndexProvider from '../types/IndexProvider';
import type { BaseItem } from './types';
export declare function createExternalIndex<T extends BaseItem<I> = BaseItem, I = any>(field: string, index: Map<string, Set<number>>): IndexProvider<T, I>;
export default function createIndex<T extends BaseItem<I> = BaseItem, I = any>(field: string): IndexProvider<T, I>;
