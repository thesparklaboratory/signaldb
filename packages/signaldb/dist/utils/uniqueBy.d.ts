export default function uniqueBy<T>(arr: T[], fn: keyof T | ((item: T) => any)): T[];
