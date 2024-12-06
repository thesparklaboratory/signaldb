export default function createOPFSAdapter<T extends {
    id: I;
} & Record<string, any>, I>(filename: string, options?: {
    serialize?: (items: T[]) => string;
    deserialize?: (itemsString: string) => T[];
}): import("..").PersistenceAdapter<T, I>;
