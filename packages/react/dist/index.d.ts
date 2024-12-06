import type { DependencyList } from 'react';
interface StopComputation {
    (): void;
}
interface ReactiveEffect {
    (reactiveFunction: () => void): StopComputation;
}
export declare function createUseReactivityHook(effect: ReactiveEffect): <T>(reactiveFn: () => T, deps?: DependencyList) => T;
export {};
