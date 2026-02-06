import { test as setup, expect } from '@playwright/test';
import { EnvHelper } from '@utils/EnvHelper';
import { LoginPage } from '@pages/index';

const adminFile = './support/.auth/storage.json';

setup('Авторизация в KeyClock', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.loginButton.click();
    await loginPage.inputLogin.fill(EnvHelper.login);
    await expect(loginPage.inputLogin).toHaveValue(EnvHelper.login);
    await loginPage.buttonSubmit.click();
    await loginPage.inputPassword.fill(EnvHelper.password);
    await expect(loginPage.inputPassword).toHaveValue(EnvHelper.password);
    const responseAuth = page.waitForResponse(response =>
        response.url().includes('login-actions/authenticate'));
    await loginPage.buttonSubmit.click();
    expect((await responseAuth).status()).toBe(302);

    await page.waitForLoadState();
    await expect(page.getByText(EnvHelper.nameApp)).toBeVisible({ timeout: 55_000 });
    await page.context().storageState({ path: adminFile });
});
