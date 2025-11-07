import { test, expect } from '@playwright/test';
import { MainPage, LoginUser, TemplateList } from '../src/pages/index';
import { App } from '../src/pages/app.page';
let app;

test.describe('create task', () => {
  test.beforeEach(async ({ page }) => {
    // Добавил общий Timeout что бы тест длилься более 20 сек, пока прогружается главная страница после логина
    test.setTimeout(85_000);
    app = new App(page);
    await app.mainPage.open();
    await app.loginUser.loginKS();
  });

  test('Тест - проверки выдачи активных/девктивных шаблонов', async ({ page }) => {
    await app.mainPage.openMenu();
    await app.templateList.openTaskSection();
    await app.templateList.activFlag();
  });
});
