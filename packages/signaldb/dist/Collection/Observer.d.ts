type AddedCallback<T> = (item: T) => void;
type AddedBeforeCallback<T> = (item: T, before: T) => void;
type ChangedCallback<T> = (item: T) => void;
type ChangedFieldCallback<T> = <Field extends keyof T>(item: T, field: Field, oldValue: T[Field], newValue: T[Field]) => void;
type MovedBeforeCallback<T> = (item: T, before: T) => void;
type RemovedCallback<T> = (item: T) => void;
export interface ObserveCallbacks<T> {
    added?: AddedCallback<T>;
    addedBefore?: AddedBeforeCallback<T>;
    changed?: ChangedCallback<T>;
    changedField?: ChangedFieldCallback<T>;
    movedBefore?: MovedBeforeCallback<T>;
    removed?: RemovedCallback<T>;
}
export default class Observer<T extends {
    id: any;
}> {
    private previousItems;
    private callbacks;
    private unbindEvents;
    constructor(bindEvents: () => () => void);
    private call;
    private hasCallbacks;
    isEmpty(): boolean;
    runChecks(newItems: T[]): void;
    stop(): void;
    addCallbacks(callbacks: ObserveCallbacks<T>, skipInitial?: boolean): void;
    removeCallbacks(callbacks: ObserveCallbacks<T>): void;
}
export {};
