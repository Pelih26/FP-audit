import { BasePage } from '@pages/base/BasePage';

export class LoginPage extends BasePage {
    loginButton = this.page.getByRole('button', { name: 'Войти' });
    inputLogin = this.page.locator('#username');
    inputPassword = this.page.locator('#password');
    buttonSubmit = this.page.locator('#kc-login');
};