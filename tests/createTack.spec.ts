import { test, expect } from '@playwright/test';
import { App } from '@app/pages/App';

let app: App;

test.describe('create task', () => {
  test.beforeEach(async ({ page }) => {
    // Добавил общий Timeout что бы тест длилься более 20 сек, пока прогружается главная страница после логина
    test.setTimeout(85_000);
    app = new App(page);
    await app.mainPage.open();
    await app.loginUser.loginKS();
  });

  test('Тест - создание задачи с типом "Общая"', async ({ page }) => {
    await app.createTask.openTaskSection();
    await app.createTask.fillTask('Общая');
    await expect(page.locator('#smallbox1')).toContainText(
      'Задача будет создана в течение 15 минут',
    );
  });

  test('Тест - создание задачи с типом "Фотоотчёт"', async ({ page }) => {
    await app.createTask.openTaskSection();
    await app.createTask.fillTask('Фотоотчёт');
    await expect(page.locator('#smallbox1')).toContainText(
      'Задача будет создана в течение 15 минут',
    );
  });

  test('Тест - создание задачи с типом "Проверка наличия"', async ({ page }) => {
    await app.createTask.openTaskSection();
    await app.createTask.fillTask('Проверка наличия');
    await expect(page.locator('#smallbox1')).toContainText(
      'Задача будет создана в течение 15 минут',
      { timeout: 20_000 },
    );
  });

  test('Тест - создание задачи с типом "Пересчёт товара"', async ({ page }) => {
    await app.createTask.openTaskSection();
    await app.createTask.fillTaskManualRecalculation('Пересчёт товара');
    await expect(page.locator('#smallbox1')).toContainText(
      'Задача будет создана в течение 15 минут',
    );
  });

  test('Тест - создание задачи с типом "Сбор данных"', async ({ page }) => {
    await app.createTask.openTaskSection();
    await app.createTask.fillTaskManualDataCollection('Сбор данных');
    await expect(page.locator('#smallbox1')).toContainText(
      'Задача будет создана в течение 15 минут',
    );
  });

  test('Тест - создание задачи с типом "Подготовка к инвентаризации"', async ({ page }) => {
    app = new App(page);
    await app.createTask.openTaskSection();
    await app.createTask.fillTaskManualInventory('Подготовка к инвентаризации');
    await expect(page.locator('#smallbox1')).toContainText(
      'Задача будет создана в течение 15 минут',
    );
  });
});
