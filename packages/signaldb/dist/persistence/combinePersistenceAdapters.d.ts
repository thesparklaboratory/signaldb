import type PersistenceAdapter from '../types/PersistenceAdapter';
export declare function createTemporaryFallbackExecutor<Args extends Array<any>, ReturnVal>(firstResolvingPromiseFn: (...args: Args) => Promise<ReturnVal>, secondResolvingPromiseFn: (...args: Args) => Promise<ReturnVal>, options?: {
    onResolve?: (returnValue: ReturnVal) => void;
    cacheTimeout?: number;
}): (...args: Args) => Promise<ReturnVal>;
export default function combinePersistenceAdapters<T extends {
    id: I;
} & Record<string, any>, I>(primary: PersistenceAdapter<T, I>, secondary: PersistenceAdapter<T, I>, options?: {
    readPreference?: 'primary' | 'secondary';
}): PersistenceAdapter<T, I>;
