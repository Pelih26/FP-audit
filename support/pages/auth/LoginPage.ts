import { Page } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { config } from '@utils/EnvHelper';

export class LoginUser extends BasePage {
  loginButton: import('@playwright/test').Locator;
  inputUserName: import('@playwright/test').Locator;
  inputPassword: import('@playwright/test').Locator;
  ksloginButton: import('@playwright/test').Locator;

  constructor(page: Page) {
    super(page);
    this.loginButton = page.getByRole('button', { name: 'Войти' });
    this.inputUserName = page.locator('#username');
    this.inputPassword = page.locator('#password');
    this.ksloginButton = page.locator('#kc-login');
  }

  async open(): Promise<void> {
    await super.open(`${config.baseUrl}/#/login`);
  }

  async loginKS(username = config.username, password = config.password): Promise<void> {
    await this.click(this.loginButton);
    await this.fill(this.inputUserName, username);
    await this.click(this.ksloginButton);
    await this.fill(this.inputPassword, password);
    await this.click(this.ksloginButton);
  }
}