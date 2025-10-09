import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { get } from 'http';

test.only('test search template', async ({ page }) => {
  let womanProfileaArray = [1, 1.1, {}, 'string', false, 454545];
  womanProfileaArray[womanProfileaArray.length] = 'ТЫКВА';
  // womanProfileaArray[5] = 'ТЫКВА'
  // console.log(womanProfileaArray[womanProfileaArray.length - 1]);
  // console.log(womanProfileaArray.at(-1)); // Более лучший вариант
  //   console.log(womanProfileaObject.name);
  //   console.log(womanProfileaObject[1]);
  //   console.log(womanProfileaObject['name']);

  let newUser = {
    getUserEmail: faker.internet.email(),
    getUserName: faker.person.firstName('female'),
    getUserPassword: faker.internet.password(),
    'all is ok': () => {
      console.log('У вас все получиться!');
    },
    getText: () => {
      console.log('И у меня все получиться!');
    },
  };
  await page.getByRole('link').all();

  console.log(newUser.getText());
  newUser['all is ok']();

  let exp = newUser;
  console.log(newUser);
  console.log(exp);
  newUser.brokenMe = true;
  console.log(newUser);
  console.log(exp);

  // console.log(womanProfileaArray[womanProfileaArray.length - 1]);
  // console.log(womanProfileaArray.at(-1)); // Более лучший вариант
  //   console.log(womanProfileaObject.name);
  //   console.log(womanProfileaObject[1]);
  //   console.log(womanProfileaObject['name']);
});

// await page.locator('.minifyme').click();
// await page.locator('a').filter({ hasText: 'Администрирование' }).click();
// await page.getByRole('link', { name: 'Пользователи' }).click();
await page.getByRole('button', { name: 'Новый пользователь' }).click();
// Создание нового пользователя
//await page.getByRole('checkbox', { name: 'Активный пользователь' }).uncheck();
await page.locator('input[name="login"]').click();
await page.locator('input[name="login"]').fill(newUser.email);
// Вводим email
await page.getByRole('textbox', { name: 'E-mail', exact: true }).click();
await page.getByRole('textbox', { name: 'E-mail', exact: true }).fill(newUser.email);
// Вводим имя
await page.locator('#newUserForm').getByRole('textbox', { name: 'Имя' }).click();
await page.locator('#newUserForm').getByRole('textbox', { name: 'Имя' }).fill(newUser.firstName);
// Вводим фамилию
await page.locator('#newUserForm').getByRole('textbox', { name: 'Фамилия' }).click();
await page.locator('#newUserForm').getByRole('textbox', { name: 'Фамилия' }).fill(newUser.lastName);
// Вводим должность
await page.locator('#newUserForm').getByRole('textbox', { name: 'Должность' }).click();
await page.locator('#newUserForm').getByRole('textbox', { name: 'Должность' }).fill('Продавец');
// Вводим пароль
await page.getByRole('textbox', { name: 'Пароль', exact: true }).click();
await page.getByRole('textbox', { name: 'Пароль', exact: true }).fill(newUser.fullPassword);
// Поддверждение пароля
await page.getByRole('textbox', { name: 'Подтвердите пароль' }).click();
await page.getByRole('textbox', { name: 'Подтвердите пароль' }).fill(newUser.fullPassword);
// Выбор бизнес направления
await page.getByLabel('Select box activate').click();
await page.getByRole('option', { name: 'Не определено' }).click();
// Выбор уровня
await page.getByLabel('Select box activate').click();
await page.locator('select[name="level"]').selectOption('string:SHOP'); // не работает, не выбирает уровень, просто кликает и всплывает список
// Клик создать пользователя
await page.getByRole('button', { name: 'Создать пользователя' }).click();
//  Проверка что в строке поиска отображаеться вновь созданых пользователь
await expect(page.getByRole('table')).toContainText(email);
await expect(page.getByRole('table')).toContainText(email);
import { BasePage } from './base.page';

export class UsersPage extends BasePage {
  constructor(page) {
    super(page);
    // Навигация
    this.administrationLink = page.locator('a').filter({ hasText: 'Администрирование' });
    this.usersLink = page.getByRole('link', { name: 'Пользователи' });

    // Кнопки
    this.newUserButton = page.getByRole('button', { name: 'Новый пользователь' });
    this.applyButton = page.getByRole('button', { name: 'Применить' });

    // Поля формы
    this.loginInput = page.locator('input[name="login"]');
    this.emailUser = page.getByRole('textbox', { name: 'E-mail', exact: true });
    this.firstName = page.locator('#newUserForm').getByRole('textbox', { name: 'Имя' });
    this.lastName = page.locator('#newUserForm').getByRole('textbox', { name: 'Фамилия' });
    this.UserPost = page.locator('#newUserForm').getByRole('textbox', { name: 'Должность' });
    this.fullPassword = page.getByRole('textbox', { name: 'Пароль', exact: true });
    this.confirmationPassword = page.getByRole('textbox', { name: 'Подтвердите пароль' });
    this.businessDirection = page.getByLabel('Select box activate');
    this.businessDirectionChoice = page.getByRole('option', { name: 'Не определено' });

    // Элементы таблицы
    this.noDataCell = page.getByRole('cell', { name: 'Нет данных' });
  }

  async openUsersSection() {
    await this.administrationLink.click();
    await this.usersLink.click();
  }

  async openCreateUserForm() {
    await this.openUsersSection();
    await this.newUserButton.click();
  }

  async fillUserForm(email, firstName, lastName, fullPassword) {
    await this.loginInput.fill(email);
    await this.emailUser.fill(email);
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.UserPost.fill('Продавец');
    await this.fullPassword.fill(fullPassword);
    await this.confirmationPassword.fill(fullPassword);
    await this.businessDirection.click();
    await this.businessDirectionChoice.click();
  }

  async searchUserByEmail(email) {
    await this.openUsersSection();
    await this.emailUser.fill(email);
    await this.applyButton.click();
  }

  async expectNoDataFound() {
    await expect(this.noDataCell).toBeVisible();
  }
}
