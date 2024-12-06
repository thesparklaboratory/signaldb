/**
 * Compute changes between two arrays of items.
 * @param oldItems Array of the old items
 * @param newItems Array of the new items
 * @returns The changeset
 */
export default function computeChanges<T extends Record<string, any>>(oldItems: T[], newItems: T[]): {
    added: T[];
    modified: T[];
    removed: T[];
};
