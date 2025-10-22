import { Page, test } from "@playwright/test";

export function step(target: (...args: any[]) => any, context: ClassMethodDecoratorContext) {
    return function replacementMethod(...args: any) {
        const name = this.constructor.name + "." + (context.name as string) + "(" + (args as string) + ")";
        return test.step(name, async () => {
            return await target.call(this, ...args);
        });
    };
}

class SomeClass {
    constructor(public readonly p: Page) {}

    @step
    async gotoSomePage(url: string) {
        await this.p.goto(url);
    }
}