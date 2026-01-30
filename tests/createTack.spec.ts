import { test, expect } from '@playwright/test';
import { App } from '../support/pages/App';

let app: App;

test.describe('create task', () => {
  test.beforeEach(async ({ page }) => {
    // Добавил общий Timeout что бы тест длилься более 20 сек, пока прогружается главная страница после логина
    test.setTimeout(45_000);
    app = new App(page);
    await app.mainPage.open();
    await app.loginUser.loginKS();
    // Добавил Timeout что бы тест дожидался разблокировки страницы (при стабильном деве достаточно 6 сек)
    await page.waitForTimeout(15_000);
  });

  test('Тест - создание задачи с типом "Общая"', async ({ page }) => {
    await app.createTask.openTaskSection();
    await app.createTask.fillTask();
    await expect(page.locator('#smallbox1')).toContainText(
      'Задача будет создана в течение 15 минут',
    );
  });

  test('Тест - создание задачи с типом "Фотоотчёт"', async ({ page }) => {
    await app.createTask.openTaskSection();
    await app.createTask.fillTask();
    await expect(page.locator('#smallbox1')).toContainText(
      'Задача будет создана в течение 15 минут',
    );
  });
});
