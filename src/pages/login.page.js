import { BasePage } from './base.page';

export class LoginUser extends BasePage {
  constructor(page) {
    super(page);
    this.loginButton = page.getByRole('button', { name: 'Войти' });
    this.inputUserName = page.locator('#username');
    this.inputPassword = page.locator('#password');
    this.ksloginButton = page.locator('#kc-login');
  }

  async loginKS(username = 'admindp', password = 'RGa2EGJkaP@X') {
    await this.click(this.loginButton);
    await this.fill(this.inputUserName, username);
    await this.fill(this.inputPassword, password);
    await this.click(this.ksloginButton);
  }
}
