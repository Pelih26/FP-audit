import { test, expect } from '@playwright/test';
import { MainPage, AdministrationUserPage, LoginUser } from '../support/pages/index';
import { GenerateData } from '../support/utils/GenerateData';
let mainPage;
let loginUser;
let administrationUserPage;
let newUser: {
  text_input?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  fullPassword?: string;
};

test.describe.only('Раздел Администрирование', () => {
  test.beforeEach(async ({ page }) => {
    // Добавил общий Timeout что бы тест длилься более 20 сек, пока прогружается главная страница после логина
    test.setTimeout(45_000);
    mainPage = new MainPage(page);
    loginUser = new LoginUser(page);
    await mainPage.open();
    await loginUser.loginKS();
    // Добавил Timeout что бы тест дожидался разблокировки страницы (при стабильном деве достаточно 6 сек)
    await page.waitForTimeout(15_000);
  });

  /* Тест поверяет поиск пользователя по email (негативный)
    - Ожидаемый результат пользователь не найден
  */
  test('Проверка поиска несуществующего пользователя, ТК-35397', async ({ page }) => {
    mainPage = new MainPage(page);
    administrationUserPage = new AdministrationUserPage(page);
    await mainPage.openMenu();
    await administrationUserPage.openUsersSection();
    await page.waitForTimeout(2_000);
    await administrationUserPage.searchUserByEmail(newUser.email);
    // Надо добавить явное ожидание
    await page.waitForTimeout(2_000);
    await expect(page.getByRole('table')).toContainText('Нет данных');
  });

  /* Тест проверяет создание нового пользователя в разделе Администрирование - пользователи
    - Ожидаемый результат создан новый пользователь.
  */
  test('Создание нового пользователя, ТК-35405', async ({ page }) => {
    mainPage = new MainPage(page);
    administrationUserPage = new AdministrationUserPage(page);
    newUser = new GenerateData()
      .addEmail()
      .addFirstName()
      .addlastName()
      .addfullPassword()
      .generate();
    await mainPage.openMenu();
    await administrationUserPage.openCreateUserForm();
    await administrationUserPage.fillUserForm(newUser);
  });
});
