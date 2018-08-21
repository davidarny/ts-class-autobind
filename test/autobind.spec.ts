import { autobind } from "../src/autobind";
import { expect } from "chai";

const invoke = (fn: Function) => fn();

describe("Autobind", () => {
    it("should bind methods", () => {
        class Foo {
            constructor() {
                autobind(this);
            }

            getThis() {
                return this;
            }
        }

        const foo = new Foo();
        expect(foo.getThis).to.not.equal(Foo.prototype.getThis);
        expect(invoke(foo.getThis)).to.equal(foo);
    });

    it("should not bind excluded methods", () => {
        class Foo {
            constructor() {
                autobind(this);
            }

            render() {
                return this;
            }
        }

        const foo = new Foo();
        expect(foo.render).to.equal(Foo.prototype.render);
        expect(invoke(foo.render)).to.equal(void 0);
    });

    it("should not accept optional second param", () => {
        class Foo {
            constructor() {
                // When called from a subclass via super(), we cannot auto-detect which
                // prototype we should use as a source for autobind.
                autobind(this, Foo.prototype);
            }

            getThis() {
                return this;
            }
        }

        class Bar extends Foo {}

        const bar = new Bar();
        expect(bar.getThis).to.not.equal(Foo.prototype.getThis);
        expect(invoke(bar.getThis)).to.equal(bar);
    });

    it("should work with getters", () => {
        class Foo {
            constructor() {
                autobind(this);
            }

            get instance() {
                return this;
            }
        }

        const foo = new Foo();
        expect(foo.instance).to.not.equal(Foo.prototype.instance);
        expect(foo.instance).to.equal(foo);
    });

    it("should not work with fields", () => {
        class Foo {
            // noinspection JSUnusedGlobalSymbols
            static baz = "wow";
            // noinspection JSUnusedGlobalSymbols
            hello = "world";
            // noinspection JSUnusedLocalSymbols
            private foo = "bar";

            constructor() {
                autobind(this);
            }
        }

        const foo = new Foo();
        expect(foo).to.haveOwnProperty("hello");
        expect(foo).to.haveOwnProperty("foo");
        expect(Foo).to.haveOwnProperty("baz");
    });

    it("should fail", () => {
        class Foo {
            constructor() {
                expect(() => autobind(void 0)).to.throw(
                    `Cannot get prototype of ${typeof void 0}`,
                );
            }

            getThis() {
                return this;
            }
        }

        const foo = new Foo();
        expect(foo.getThis).to.equal(Foo.prototype.getThis);
        expect(invoke(foo.getThis)).to.equal(void 0);
    });
});
