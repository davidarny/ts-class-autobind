export function isPrototype<T extends object>(value: unknown): value is T {
    return typeof value === "object";
}
