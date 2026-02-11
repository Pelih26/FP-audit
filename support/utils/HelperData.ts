import { Page } from '@playwright/test';

export class HelperData {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getCurrentDate(): string {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        return `${day}.${month}.${year}`;
    }

    async appendTextToInput(locator: string, text: string): Promise<void> {
        const input = this.page.locator(locator);
        const currentValue = await input.inputValue();
        await input.fill(currentValue + text);
    }

    async selectCurrentDate(): Promise<void> {
        const day = new Date().getDate();
        const todayDate = this.page.locator('.dp__today');
        await todayDate.getByText(String(day), { exact: true }).click();
        await this.page.getByRole('button', { name: 'Выбрать' }).click();
    }
}
