export default function set<T extends object, K>(obj: T, path: string, value: K, deleteIfUndefined?: boolean): T;
