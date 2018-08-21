import { isFunction } from "./isFunction";
import { isExcluded } from "./isExcluded";
import { isPrototype } from "./isPrototype";
import { IPrototype } from "./IPrototype";

export function autobind(instance: unknown, proto?: unknown) {
    if (!proto) {
        try {
            proto = Object.getPrototypeOf(instance);
        } catch (error) {
            throw new Error(`Cannot get prototype of ${typeof instance}`);
        }
    }
    const propertyNames = Object.getOwnPropertyNames(proto);
    for (const name of propertyNames) {
        if (!isPrototype<IPrototype>(proto)) {
            return;
        }
        if (!isPrototype<IPrototype>(instance)) {
            return;
        }
        const value = proto[name];
        if (isFunction(value) && !isExcluded(name)) {
            instance[name] = proto[name].bind(instance);
        }
    }
}
