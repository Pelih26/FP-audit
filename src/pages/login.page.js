import { BasePage } from './base.page';

export class LoginUser extends BasePage {
  constructor(page) {
    super(page);
    this.loginButton = this.page.getByRole('button', { name: 'Войти' });
    this.inputUserName = this.page.locator('#username');
    this.inputPassword = this.page.locator('#password');
    this.ksloginButton = this.page.locator('#kc-login');
  }

  async loginKS() {
    await this.loginButton.click();
    await this.inputUserName.fill('admindp');
    await this.inputPassword.fill('RGa2EGJkaP@X');
    await this.ksloginButton.click();
  }
}
