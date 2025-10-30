import { test, expect } from '@playwright/test';
// Импорт Faker с русской локалью
import { fakerRU as faker } from '@faker-js/faker';
import { allure } from 'allure-playwright';
import { MainPage, LoginUser, CreateTask } from '../src/pages/index';
import { App } from '../src/pages/app.page';
const url = 'https://audit-dev4.fix-price.ru/#/login';
let app;

test.describe('create task', () => {
  test.beforeEach(async ({ page }) => {
    // Добавил общий Timeout что бы тест длилься более 20 сек, пока прогружается главная страница после логина
    test.setTimeout(65_000);
    app = new App(page);
    await app.mainPage.open(url);
    await app.loginUser.loginKS();
  });

  test('Тест - создание задачи с типом "Общая"', async ({ page }) => {
    await app.mainPage.openMenu();
    await app.createTask.openTaskSection();
    await app.createTask.fillTask('Общая');
    await expect(page.locator('#smallbox1')).toBeVisible();
    await expect(page.locator('#smallbox1')).toContainText(
      'Задача будет создана в течение 15 минут',
    );
  });

  test('Тест - создание задачи с типом "Фотоотчёт"', async ({ page }) => {
    await app.mainPage.openMenu();
    await app.createTask.openTaskSection();
    await app.createTask.fillTask('Фотоотчёт');
    await expect(page.locator('#smallbox1')).toBeVisible();
    await expect(page.locator('#smallbox1')).toContainText(
      'Задача будет создана в течение 15 минут',
    );
  });

  test('Тест - создание задачи с типом "Проверка наличия"', async ({ page }) => {
    await app.mainPage.openMenu();
    await app.createTask.openTaskSection();
    await app.createTask.fillTask('Проверка наличия');
    await expect(page.locator('#smallbox1')).toBeVisible({ timeout: 20_000 });
    await expect(page.locator('#smallbox1')).toContainText(
      'Задача будет создана в течение 15 минут',
    );
  });

  test('Тест - создание задачи с типом "Пересчёт товара"', async ({ page }) => {
    await app.mainPage.openMenu();
    await app.createTask.openTaskSection();
    await app.createTask.fillTaskManualRecalculation('Пересчёт товара');
    await expect(page.locator('#smallbox1')).toBeVisible();
    await expect(page.locator('#smallbox1')).toContainText(
      'Задача будет создана в течение 15 минут',
    );
  });

  test('Тест - создание задачи с типом "Сбор данных"', async ({ page }) => {
    await app.mainPage.openMenu();
    await app.createTask.openTaskSection();
    await app.createTask.fillTaskManualDataCollection('Сбор данных');
    await expect(page.locator('#smallbox1')).toBeVisible();
    await expect(page.locator('#smallbox1')).toContainText(
      'Задача будет создана в течение 15 минут',
    );
  });

  test('Тест - создание задачи с типом "Подготовка к инвентаризации"', async ({ page }) => {
    app = new App(page);
    await app.mainPage.openMenu();
    await app.createTask.openTaskSection();
    await app.createTask.fillTaskManualInventory('Подготовка к инвентаризации');
    await expect(page.locator('#smallbox1')).toBeVisible();
    await expect(page.locator('#smallbox1')).toContainText(
      'Задача будет создана в течение 15 минут',
    );
  });

  // Блок тестов на проверку что задачи созданы
  /*
  test('Тест проверяет что задача с типом "Подготовка к инвентаризации" создана', async ({
    page,
  }) => {
    mainPage = new MainPage(page);
    createTask = new CreateTask(page);
    await mainPage.openMenu();
    await createTask.openTaskSection();
    await createTask.fillTask();
    await expect(page.locator('#smallbox1')).toBeVisible();
    await expect(page.locator('#smallbox1')).toContainText(
      'Задача будет создана в течение 15 минут',
    );
  });*/
});
