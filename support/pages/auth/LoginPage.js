import { BasePage } from '../base/BasePage.js';
import { config } from '../utils/EnvHelper.js';

export class LoginUser extends BasePage {
  constructor(page) {
    super(page);
    this.loginButton = page.getByRole('button', { name: 'Войти' });
    this.inputUserName = page.locator('#username');
    this.inputPassword = page.locator('#password');
    this.ksloginButton = page.locator('#kc-login');
  }

  async open() {
    await super.open(`${config.baseUrl}/#/login`);
  }

  async loginKS(username = config.username, password = config.password) {
    await this.click(this.loginButton);
    await this.fill(this.inputUserName, username);
    await this.fill(this.inputPassword, password);
    await this.click(this.ksloginButton);
  }
}
