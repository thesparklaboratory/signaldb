import type { BaseItem, CollectionOptions } from './Collection';
import Collection from './Collection';
export default class PersistentCollection<T extends BaseItem<I> = BaseItem, I = any, U = T> extends Collection<T, I, U> {
    constructor(name: string, options?: CollectionOptions<T, I, U>);
}
