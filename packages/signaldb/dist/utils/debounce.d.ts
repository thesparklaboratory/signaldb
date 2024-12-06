type DebounceOptions = {
    leading?: boolean;
    trailing?: boolean;
};
/**
 * Debounces a function.
 * @param func Function to debounce
 * @param wait Time to wait before calling the function.
 * @param [options] Debounce options
 * @param [options.leading] Whether to call the function on the leading edge of the wait interval.
 * @param [options.trailing] Whether to call the function on the trailing edge of the wait interval.
 * @returns The debounced function.
 */
export default function debounce<Args extends any[], T, ThisType>(func: (this: ThisType, ...args: Args) => T, wait: number, options?: DebounceOptions): (...args: Args) => T;
export {};
