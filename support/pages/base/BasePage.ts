import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open(path: string = '/'): Promise<void> {
        await this.page.goto(path);
    }

    async click(element: any): Promise<void> {
        await element.click();
    }

    async fill(element: any, text: string): Promise<void> {
        await element.fill(text);
    }
}
