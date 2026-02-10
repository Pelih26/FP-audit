import { Page } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';

export class LoginPage extends BasePage {
    readonly loginButton = this.page.getByRole('button', { name: 'Войти' });
    readonly inputLogin = this.page.locator('#username');
    readonly inputPassword = this.page.locator('#password');
    readonly buttonSubmit = this.page.locator('#kc-login');

    constructor(page: Page) {
        super(page);
    }

    async open() {
        await super.open(`${process.env.BASE_URL}`);
    }
}
