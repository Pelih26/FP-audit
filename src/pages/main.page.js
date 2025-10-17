import { BasePage } from './base.page';
import { test, expect } from '@playwright/test';

export class MainPage extends BasePage {
  constructor(page) {
    super(page);
    this.menu = page.locator('.minifyme');
  }

  async openMenu() {
    // await this.menu.waitFor({ state: 'visible', timeout: 20_000 });
    await expect(this.menu).toBeVisible({ timeout: 20_000 });
    await this.menu.click();
  }
}
