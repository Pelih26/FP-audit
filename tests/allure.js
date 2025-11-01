import { test, expect } from '@playwright/test';
// Импорт Faker с русской локалью
import { fakerRU as faker } from '@faker-js/faker';
import { allure } from 'allure-playwright';
import { MainPage, AdministrationUserPage, LoginUser } from '../src/pages/index';
let mainPage;
let loginUser;
let administrationUserPage;

let newUser = {
  text_input: faker.lorem.text(),
  email: faker.internet.email({ provider: 'AQA.ru' }),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  fullPassword: faker.internet.password(),
};

test.describe.only('administration-section', () => {
  test.beforeEach(async ({ page }) => {
    // Добавил общий Timeout что бы тест длилься более 20 сек, пока прогружается главная страница после логина
    test.setTimeout(45_000);
    mainPage = new MainPage(page);
    loginUser = new LoginUser(page);
    await mainPage.open(url);
    await loginUser.loginKS();
    // Добавил Timeout что бы тест дожидался разблокировки страницы (при стабильном деве достаточно 6 сек)
    await page.waitForTimeout(8_000);
  });

  /* Тест поверяет поиск пользователя по email (негативный)
    - Ожидаемый результат пользователь не найден
  */
  test('test search alert, ТК-35397', async ({ page }) => {
    mainPage = new MainPage(page);
    administrationUserPage = new AdministrationUserPage(page);
    await allure.displayName('Test Authentication');
    await allure.owner('John Doe');
    await allure.tags('Web interface', 'Authentication');
    await allure.severity('critical');
    await allure.tms('ссылка');
    await mainPage.openMenu();
    await administrationUserPage.openUsersSection();
    await administrationUserPage.searchUserByEmail(newUser.email);
    // Надо добавить явное ожидание
    await page.waitForTimeout(2_000);
    await expect(page.getByRole('table')).toContainText('Нет данных');
  });

  /* Тест проверяет создание нового пользователя в разделе Администрирование - пользователи
    - Ожидаемый результат создан новый пользователь.
  */
  test('Creating a user, ТК-35405', async ({ page }) => {
    mainPage = new MainPage(page);
    administrationUserPage = new AdministrationUserPage(page);
    await allure.displayName('Test Authentication');
    await allure.owner('John Doe');
    await allure.tags('Web interface', 'Authentication');
    await allure.severity('critical');
    await allure.tms('ссылка');
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
