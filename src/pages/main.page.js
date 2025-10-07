import { BasePage } from './base.page';

export class MainPage extends BasePage {
  constructor(page) {
    super(page);
    this.menu = page.locator('.minifyme');
  }

  async openMenu() {
    await this.menu.click();
  }
}
