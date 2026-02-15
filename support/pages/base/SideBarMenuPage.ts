import { Page, expect } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { HelperData } from '@utils/HelperData';

export class SideBarMenuPage extends BasePage {
    private readonly menu = this.page.locator('.minifyme');
    private readonly helper: HelperData;


    constructor(page: Page) {
        super(page);
        this.helper = new HelperData(this.page);
    }

    async openMenu(): Promise<void> {
        await this.helper.waitForLoaderToDisappear();
        await this.menu.click();
    }
}
