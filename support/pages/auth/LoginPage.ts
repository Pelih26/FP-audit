import { Page } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';

export class LoginUser extends BasePage {
    private readonly loginButton = this.page.getByRole('button', { name: 'Войти' });
    private readonly inputUserName = this.page.locator('#username');
    private readonly inputPassword = this.page.locator('#password');
    private readonly ksloginButton = this.page.locator('#kc-login');

    constructor(page: Page) {
        super(page);
    }

    async open(): Promise<void> {
        await super.open(`${process.env.BASE_URL}/#/login`);
    }

    async loginKS(
        login: string = process.env.LOGIN!,
        password: string = process.env.PASSWORD!,
    ): Promise<void> {
        await this.click(this.loginButton);
        await this.fill(this.inputUserName, login);
        await this.click(this.ksloginButton);
        await this.fill(this.inputPassword, password);
        await this.click(this.ksloginButton);
    }
}
