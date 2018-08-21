// tslint:disable-next-line:ban-types
export function isFunction(item: unknown): item is Function {
    return typeof item === "function";
}
