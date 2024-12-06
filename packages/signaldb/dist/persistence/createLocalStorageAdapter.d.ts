export default function createLocalStorageAdapter<T extends {
    id: I;
} & Record<string, any>, I>(name: string, options?: {
    serialize?: (items: T[]) => string;
    deserialize?: (itemsString: string) => T[];
}): import("..").PersistenceAdapter<T, I>;
