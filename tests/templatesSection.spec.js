import { test, expect } from '@playwright/test';
import { MainPage, LoginUser, TemplateList } from '../support/pages/index';
import { App } from '../support/pages/App.js';
let app;

test.describe('templates section', () => {
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
