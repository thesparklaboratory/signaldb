import type Modifier from '../types/Modifier';
export default function modify<T extends Record<string, any>>(item: T, modifier: Modifier): T;
