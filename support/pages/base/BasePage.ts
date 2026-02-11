import { Page } from '@playwright/test';
import { EnvHelper } from '@utils/EnvHelper';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open(url: string = EnvHelper.baseUrl!): Promise<void> {
        await this.page.goto(url);
    }

    async click(element: any): Promise<void> {
        await element.click();
    }

    async fill(element: any, text: string): Promise<void> {
        await element.fill(text);
    }
}
