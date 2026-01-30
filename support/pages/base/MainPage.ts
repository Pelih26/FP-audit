import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class MainPage extends BasePage {
  menu: import('@playwright/test').Locator;

  constructor(page: Page) {
    super(page);
    this.menu = page.locator('.minifyme');
  }

  async openMenu(): Promise<void> {
    // await this.menu.waitFor({ state: 'visible', timeout: 20_000 });
    await expect(this.menu).toBeVisible({ timeout: 45_000 });
    await this.menu.click();
  }
}