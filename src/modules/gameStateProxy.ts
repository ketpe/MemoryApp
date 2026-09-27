/**
 * Creates a proxy to track object mutations.
 *
 * @param target - The object to proxy.
 * @param onChange - Callback triggered on any mutation.
 * @returns A proxied version of the target object.
 */
export function createProxy<T extends object>(target: T, onChange: () => void): T {
    return new Proxy(target, {
        get(obj, prop) {
            const VALUE = obj[prop as keyof T];
            if (VALUE !== null && typeof VALUE === 'object') {
                return createProxy(VALUE as any, onChange);
            }
            return VALUE;
        },
        set(obj, prop, VALUE) {
            obj[prop as keyof T] = VALUE;
            onChange();
            return true;
        }
    });
}