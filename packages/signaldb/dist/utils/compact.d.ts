type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T;
export default function compact<T>(array: T[]): Truthy<T>[];
export {};
