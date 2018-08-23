import { autobind } from "../src/autobind";
import { memory } from "./utils";

const COUNT = 1_000_000;

describe("Performance", function() {
    if (!process.env.PERF_TEST) {
        return;
    }
    if (!global.gc) {
        throw new Error(
            "Please, specify --expose-gc Node flag to run performance tests correctly",
        );
    }
    this.timeout(`${COUNT}s`);
    beforeEach((done: Mocha.Done) => {
        global.gc();
        console.log("Calling garbage collector...");
        setTimeout(() => done(), 5000);
    });

    describe("Instance creation", () => {
        it(`should crete ${COUNT} classes`, () => {
            class Foo {
                // noinspection JSUnusedGlobalSymbols
                getThis() {
                    return this;
                }
            }

            let i = 0;
            const label = "Pure class creation";
            console.time(label);
            while (i++ < COUNT) {
                process.stdout.write(
                    `\rCreated instances ${i} | Total memory used: ${memory()}MB`,
                );
                new Foo();
            }
            process.stdout.write("\n");
            console.timeEnd(label);
        });

        it(`should create ${COUNT} bounded classes`, () => {
            class Foo {
                constructor() {
                    autobind(this);
                }

                // noinspection JSUnusedGlobalSymbols
                getThis() {
                    return this;
                }
            }

            let i = 0;
            const label = "Bounded class creation";
            console.time(label);
            while (i++ < COUNT) {
                process.stdout.write(
                    `\rCreated instances ${i} | Total memory used: ${memory()}MB`,
                );
                new Foo();
            }
            process.stdout.write("\n");
            console.timeEnd(label);
        });

        it(`should create ${COUNT} referenced classes`, () => {
            class Foo {
                // noinspection JSUnusedGlobalSymbols
                getThis() {
                    return this;
                }
            }

            const store = [];
            let i = 0;
            const label = "Pure class creation with reference";
            console.time(label);
            while (i++ < COUNT) {
                process.stdout.write(
                    `\rCreated instances ${i} | Total memory used: ${memory()}MB`,
                );
                store.push(new Foo());
            }
            process.stdout.write("\n");
            console.timeEnd(label);
        });

        it(`should create ${COUNT} referenced bounded classes`, () => {
            class Foo {
                constructor() {
                    autobind(this);
                }

                // noinspection JSUnusedGlobalSymbols
                getThis() {
                    return this;
                }
            }

            const store = [];
            let i = 0;
            const label = "Bound class creation with reference";
            console.time(label);
            while (i++ < COUNT) {
                process.stdout.write(
                    `\rCreated instances ${i} | Total memory used: ${memory()}MB`,
                );
                store.push(new Foo());
            }
            process.stdout.write("\n");
            console.timeEnd(label);
        });
    });

    describe("Method call", () => {
        it(`should call ${COUNT} times method of pure class`, () => {
            class Foo {
                // noinspection JSUnusedGlobalSymbols
                getThis() {
                    return this;
                }
            }

            const foo = new Foo();
            let i = 0;
            const label = "Pure class method call";
            console.time(label);
            while (i++ < COUNT) {
                process.stdout.write(
                    `\rMethod calls ${i} | Total memory used: ${memory()}MB`,
                );
                foo.getThis();
            }
            process.stdout.write("\n");
            console.timeEnd(label);
        });

        it(`should call ${COUNT} times method of bound class`, () => {
            class Foo {
                constructor() {
                    autobind(this);
                }

                // noinspection JSUnusedGlobalSymbols
                getThis() {
                    return this;
                }
            }

            const foo = new Foo();
            let i = 0;
            const label = "Bound class method call";
            console.time(label);
            while (i++ < COUNT) {
                process.stdout.write(
                    `\rMethod calls ${i} | Total memory used: ${memory()}MB`,
                );
                foo.getThis();
            }
            process.stdout.write("\n");
            console.timeEnd(label);
        });
    });
});
