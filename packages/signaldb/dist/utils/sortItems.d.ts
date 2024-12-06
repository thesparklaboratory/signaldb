export default function sortItems<T extends Record<string, any>>(items: T[], sortFields: {
    [P in keyof T]?: -1 | 1;
} & Record<string, -1 | 1>): T[];
