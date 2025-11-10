import { test as base } from '@playwright/test';
import { MainPage, LoginUser, CreateTask } from '../../support/pages/index.js';
import { App } from '../pages/app.page.js';
const url = 'https://audit-dev4.fix-price.ru/#/login';
export const test = base.extend({
  // defaultItem: ['Something nice', { option: true }],

  // Нейминг
  loginFixture: async ({ page }, use) => {
    const app = new App(page);
    const mainPage = new MainPage(page);
    const loginUser = new LoginUser(page);
    test.setTimeout(45_000);
    await app.mainPage.open(url);
    await app.loginUser.loginKS();
    // Добавил Timeout что бы тест дожидался разблокировки страницы (при стабильном деве достаточно 6 сек)
    await page.waitForTimeout(15_000);
    await use(app);
  },
});
