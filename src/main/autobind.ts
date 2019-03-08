import IPrototype from "IPrototype";
import { CONSTRUCTOR, REACT_EXCLUDE_METHODS } from "const";

export function autobind(instance: unknown, proto?: unknown): void {
    if (!proto) {
        try {
            proto = Object.getPrototypeOf(instance);
        } catch (error) {
            throw new Error(`Cannot get prototype of ${instance}`);
        }
    }
    const properties = Object.getOwnPropertyNames(proto);
    properties.forEach((name: string) => bind(name, instance, proto));
}

function bind(name: string, instance: unknown, proto?: unknown): void {
    if (!isPrototype<IPrototype>(proto)) {
        return;
    }
    if (!isPrototype<IPrototype>(instance)) {
        return;
    }
    if (name === CONSTRUCTOR) {
        return;
    }
    const descriptor = Object.getOwnPropertyDescriptor(proto, name);
    if (!descriptor) {
        return;
    }
    if (descriptor.get || descriptor.set) {
        Object.defineProperty(proto, name, {
            ...descriptor,
            get: descriptor.get ? descriptor.get.bind(instance) : void 0,
            set: descriptor.set ? descriptor.set.bind(instance) : void 0,
        });
        return;
    }
    if (isFunction(descriptor.value) && !isExcluded(name)) {
        instance[name] = proto[name].bind(instance);
    }
}

function isExcluded(key: string): boolean {
    return REACT_EXCLUDE_METHODS[key] === true;
}

// tslint:disable-next-line:ban-types
function isFunction(item: unknown): item is Function {
    return typeof item === "function";
}

export function isPrototype<T extends object>(value: unknown): value is T {
    return typeof value === "object";
}
