export default function project<T extends Record<string, any>>(item: T, fields: {
    [P in keyof T]?: 0 | 1;
} & Record<string, 0 | 1>): T;
