import { Page, expect } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';

export class MainPage extends BasePage {
    private readonly menu = this.page.locator('.minifyme');

    constructor(page: Page) {
        super(page);
    }

    async openMenu(): Promise<void> {
        await expect(this.menu).toBeVisible({ timeout: 45_000 });
        await this.menu.click();
    }
}
