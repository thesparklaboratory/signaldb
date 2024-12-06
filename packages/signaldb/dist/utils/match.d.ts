import type Selector from '../types/Selector';
type BaseItem = Record<string, any>;
export default function match<T extends BaseItem = BaseItem>(item: T, selector: Selector<T>): boolean;
export {};
