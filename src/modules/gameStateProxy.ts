
export function createProxy<T extends object>(target: T, onChange: () => void): T {
    return new Proxy(target, {
        get(obj, prop) {
            const value = obj[prop as keyof T];
            if (value !== null && typeof value === 'object') {
                return createProxy(value as any, onChange);
            }
            return value;
        },
        set(obj, prop, value) {
            obj[prop as keyof T] = value;
            onChange(); // Hier lösen wir automatisch die UI-Aktualisierung aus!
            return true;
        }
    });
}