import { test, expect } from '@playwright/test';
// Импорт Faker с русской локалью
import { fakerRU as faker } from '@faker-js/faker';
import { MainPage, AdministrationUserPage, LoginUser } from '../src/pages/index';
const url = 'https://audit-dev9.fix-price.ru/#/login';
let mainPage;
let loginUser;
let administrationUserPage;

let newUser = {
  text_input: faker.lorem.text(),
  email: faker.internet.email({provider: 'AQA.ru'}),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  fullPassword: faker.internet.password(),
};

test.describe.only('administration-section', () => {
  test.beforeEach(async ({ page }) => {
    // Добавил общий Timeout что бы тест длилься более 20 сек, пока прогружается главная страница после логина
    test.setTimeout(35_000);
    mainPage = new MainPage(page);
    loginUser = new LoginUser(page);
    // Открываем главную страницу
    await mainPage.open(url);
    // Вводим данные для аворизации
    await loginUser.loginKS();
    // Добавил Timeout что бы тест дожидался разблокировки страницы (при стабильном деве достаточно 6 сек)
    await page.waitForTimeout(20_000);
  });

  test('test search alert, ТК-35397', async ({ page }) => {
    mainPage = new MainPage(page);
    administrationUserPage = new AdministrationUserPage(page);
    await mainPage.openMenu();
    await administrationUserPage.openUsersSection();
    await administrationUserPage.searchUserByEmail(newUser.email);
    await page.waitForTimeout(2_000);
    await expect(page.getByRole('table')).toContainText('Нет данных');
  });

  test('Creating a user, ТК-35405', async ({ page }) => {
    mainPage = new MainPage(page);
    administrationUserPage = new AdministrationUserPage(page);
    await mainPage.openMenu();
    await administrationUserPage.openCreateUserForm();
    await administrationUserPage.fillUserForm(
      newUser.email,
      newUser.firstName,
      newUser.lastName,
      newUser.fullPassword,
    );
  });
});
