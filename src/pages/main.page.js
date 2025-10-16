import { BasePage } from './base.page';

export class MainPage extends BasePage {
  constructor(page) {
    super(page);
    this.menu = page.locator('.minifyme');
  }

  async openMenu() {
    await this.menu.waitFor({ state: 'visible', timeout: 20_000 }); // Ждем пока кнопка не станет активной
    await this.menu.click();
  }
}
