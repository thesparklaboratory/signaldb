import type Dependency from '../types/Dependency';
import type Signal from '../types/Signal';
export default function createSignal<T>(dependency: Dependency | undefined, initialValue: T, isEqual?: (a: T, b: T) => boolean): Signal<T>;
