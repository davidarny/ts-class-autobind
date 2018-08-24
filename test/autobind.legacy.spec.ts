import { autobind } from "../src/legacy";
import { expect } from "chai";

const invoke = (fn: Function) => fn();

describe("Legacy Autobind", () => {
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

    it("should work with getters", () => {
        class Foo {
            constructor() {
                autobind(this, Foo.prototype);
            }

            private _field = "field";

            get field(): string {
                return this._field;
            }

            set field(value: string) {
                this._field = value;
            }

            private _instance = this;

            get instance(): this {
                return this._instance;
            }

            set instance(value: this) {
                this._instance = value;
            }
        }

        class Bar extends Foo {
            constructor() {
                super();
                autobind(this);
            }

            private _prop = "prop";

            get prop(): string {
                return this._prop;
            }

            set prop(value: string) {
                this._prop = value;
            }

            private _value = this;

            get value(): this {
                return this._value;
            }

            set value(value: this) {
                this._value = value;
            }
        }

        const bar = new Bar();
        expect(bar.instance).to.equal(Foo.prototype.instance);
        expect(bar.value).to.equal(Bar.prototype.value);
        expect(bar.field).to.equal("field");
        expect(bar.prop).to.equal("prop");
        const buffer = bar.field;
        bar.field = bar.prop;
        bar.prop = buffer;
        expect(bar.field).to.equal("prop");
        expect(bar.prop).to.equal("field");
        expect(() => (bar.value = bar)).to.not.throw();
        expect(() => (bar.instance = bar)).to.not.throw();
    });
});
