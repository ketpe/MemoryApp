
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
            onChange(); // Hier lösen wir automatisch die UI-Aktualisierung aus!
            return true;
        }
    });
}