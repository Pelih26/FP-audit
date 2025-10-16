import { test, expect } from '@playwright/test';
// Импорт Faker с русской локалью
import { fakerRU as faker } from '@faker-js/faker';
import { allure } from 'allure-playwright';
import { MainPage, LoginUser, CreateTask } from '../src/pages/index';
const url = 'https://audit-dev9.fix-price.ru/#/login';
let mainPage;
let loginUser;
let createTask;

test.describe('create task', () => {
  test.beforeEach(async ({ page }) => {
    // Добавил общий Timeout что бы тест длилься более 20 сек, пока прогружается главная страница после логина
    test.setTimeout(40_000);
    mainPage = new MainPage(page);
    loginUser = new LoginUser(page);
    await mainPage.open(url);
    await loginUser.loginKS();
    // Добавил Timeout что бы тест дожидался разблокировки страницы (при стабильном деве достаточно 6 сек)
    // await page.waitForTimeout(6_000);
  });

  test('Тест- создание задачи с типом "Общая"', async ({ page }) => {
    await allure.displayName('Тест создание задач');
    await allure.owner('Пелихович Кирилл');
    await allure.tags('Web');
    await allure.severity('critical');
    await allure.tms('ссылка');
    mainPage = new MainPage(page);
    createTask = new CreateTask(page);
    await mainPage.openMenu();
    await createTask.openTaskSection();
    await createTask.fillTask('Общая');
    await expect(page.locator('#smallbox1')).toBeVisible();
    await expect(page.locator('#smallbox1')).toContainText(
      'Задача будет создана в течение 15 минут',
    );
  });

  test('Тест - создание задачи с типом "Фотоотчёт"', async ({ page }) => {
    mainPage = new MainPage(page);
    createTask = new CreateTask(page);
    await mainPage.openMenu();
    await createTask.openTaskSection();
    await createTask.fillTask('Фотоотчёт');
    await expect(page.locator('#smallbox1')).toBeVisible();
    await expect(page.locator('#smallbox1')).toContainText(
      'Задача будет создана в течение 15 минут',
    );
  });

  test('Тест - создание задачи с типом "Проверка наличия"', async ({ page }) => {
    mainPage = new MainPage(page);
    createTask = new CreateTask(page);
    await mainPage.openMenu();
    await createTask.openTaskSection();
    await createTask.fillTask('Проверка наличия');
    await expect(page.locator('#smallbox1')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('#smallbox1')).toContainText(
      'Задача будет создана в течение 15 минут',
    );
  });

  test('Тест - создание задачи с типом "Пересчёт товара"', async ({ page }) => {
    mainPage = new MainPage(page);
    createTask = new CreateTask(page);
    await mainPage.openMenu();
    await createTask.openTaskSection();
    await createTask.fillTaskManualRecalculation('Пересчёт товара');
    await expect(page.locator('#smallbox1')).toBeVisible();
    await expect(page.locator('#smallbox1')).toContainText(
      'Задача будет создана в течение 15 минут',
    );
  });

  /*
  test('Тест - создание задачи с типом "Сбор данных"', async ({ page }) => {
    mainPage = new MainPage(page);
    createTask = new CreateTask(page);
    await mainPage.openMenu();
    await createTask.openTaskSection();
    await createTask.fillTask();
    await expect(page.locator('#smallbox1')).toBeVisible();
    await expect(page.locator('#smallbox1')).toContainText(
      'Задача будет создана в течение 15 минут',
    );
  });

  test('Тест - создание задачи с типом "Подготовка к инвентаризации"', async ({ page }) => {
    mainPage = new MainPage(page);
    createTask = new CreateTask(page);
    await mainPage.openMenu();
    await createTask.openTaskSection();
    await createTask.fillTask();
    await expect(page.locator('#smallbox1')).toBeVisible();
    await expect(page.locator('#smallbox1')).toContainText(
      'Задача будет создана в течение 15 минут',
    );
  });

  // Блок тестов на проверку что задачи созданы

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
  });
  */
});
