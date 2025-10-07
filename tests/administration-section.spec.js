import { test, expect } from '@playwright/test';
// Импорт Faker с русской локалью
import { fakerRU as faker } from '@faker-js/faker';
import { MainPage, CreateUserPage, LoginUser } from '../src/pages/index';
const url = 'https://audit-dev9.fix-price.ru/#/login';
let mainPage;
let loginUser;

let newUser = {
  text_input: faker.lorem.text(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  fullPassword: faker.internet.password(),
};

test.describe.only('administration-section', () => {
  test.beforeEach(async ({ page }) => {
    // Добавил общий Timeout что бы тест длилься более 20 сек, пока прогружается главная страница после логина
    test.setTimeout(25_000);
    mainPage = new MainPage(page);
    loginUser = new LoginUser(page);
    // Открываем главную страницу
    await mainPage.open(url);
    // Вводим данные для аворизации
    await loginUser.loginKS();
    // Добавил Timeout что бы тест дожидался разблокировки страницы (при стабильном деве достаточно 6 сек)
    await page.waitForTimeout(15_000);
  });

  test('test search alert, ТК-35397', async ({ page }) => {
    await page.locator('.minifyme').click();
    await page.locator('a').filter({ hasText: 'Администрирование' }).click();
    await page.getByRole('link', { name: 'Пользователи' }).click();
    //await expect(url) добавь
    await page.getByRole('textbox', { name: 'E-Mail' }).fill(newUser.email);
    await page.getByRole('button', { name: 'Применить' }).click();
    await expect(page.getByRole('cell', { name: 'Нет данных' })).toBeVisible();
  });

  test('Creating a user, ТК-35405', async ({ page }) => {
    mainPage = new MainPage(page);
    const createUserPage = new CreateUserPage(page);
    await mainPage.openMenu();
    await createUserPage.openCreateUserForm();
    await createUserPage.fillUserForm(
      newUser.email,
      newUser.firstName,
      newUser.lastName,
      newUser.fullPassword,
    );
  });

  test('deaktiv/aktiv template', async ({ page }) => {
    await page.getByRole('link', { name: 'Шаблоны задач' }).click();
    await page.getByRole('button', { name: 'Деактивировать' }).first().click();
    await expect(page.locator('tbody')).toContainText('Активировать');
    await page.getByRole('button', { name: 'Активировать' }).first().click();
    await expect(page.locator('tbody')).toContainText('Деактивировать');
  });
});
