import { Page } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';

export class SideBarMenuPage extends BasePage {
    private readonly menu = this.page.locator('.minifyme');

    constructor(page: Page) {
        super(page);
    }

    async openMenu(): Promise<void> {
        await this.waitForLoaderToDisappear();
        await this.menu.click();
    }
}
