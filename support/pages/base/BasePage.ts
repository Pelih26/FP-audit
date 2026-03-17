import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open(path: string = '/'): Promise<void> {
        await this.page.goto(path);
    }

    async waitForLoaderToDisappear(): Promise<void> {
        await this.page.waitForSelector('ajaxloader', { state: 'hidden' });
    }
    // Метод для клика
    async click(element: any): Promise<void> {
        await element.click();
    }
    // Метод для заполнения полей
    async fill(element: any, text: string): Promise<void> {
        await element.fill(text);
    }
}