import { test, expect } from '@playwright/test';
// Импорт Faker с русской локалью
import { fakerRU as faker } from '@faker-js/faker';
import { MainPage, LoginUser, CreateTask } from '../src/pages/index';
const url = 'https://audit-dev9.fix-price.ru/#/login';
let mainPage;
let loginUser;
let createTask;

test.describe.only('create task', () => {
  test.beforeEach(async ({ page }) => {
    // Добавил общий Timeout что бы тест длилься более 20 сек, пока прогружается главная страница после логина
    test.setTimeout(40_000);
    mainPage = new MainPage(page);
    loginUser = new LoginUser(page);
    await mainPage.open(url);
    await loginUser.loginKS();
    // Добавил Timeout что бы тест дожидался разблокировки страницы (при стабильном деве достаточно 6 сек)
    await page.waitForTimeout(15_000);
  });

  test('test create task', async ({ page }) => {
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
});
