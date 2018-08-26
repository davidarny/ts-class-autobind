import { isFunction } from "./isFunction";
import { isExcluded } from "./isExcluded";
import { isPrototype } from "./isPrototype";
import { IPrototype } from "./IPrototype";
import { Const } from "./const";

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
    if (name === Const.CONSTRUCTOR) {
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
