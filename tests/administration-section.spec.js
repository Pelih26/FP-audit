import { test, expect } from '@playwright/test';
import { get } from 'http';
import { skip } from 'node:test';
// Импорт Faker с русской локалью 
import { fa, fakerRU as faker } from '@faker-js/faker'

let newUser = {
    text_input: faker.lorem.text(),
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    fullName: faker.person.fullName(), // генерит и имя и фамилию разом, посмотри исправь
    fullPassword: faker.internet.password()
};

test.describe('administration-section', () => {
  test.beforeEach(async ({ page }) => {
    // Добавил общий Timeout что бы тест длилься более 20 сек, пока прогружается главная страница после логина
    test.setTimeout(10_0000);
    await page.goto('https://audit-dev9.fix-price.ru/#/login');
    await page.getByRole('button', { name: 'Войти' }).click();
    await page.locator('#username').fill('admindp');
    await page.locator('#password').fill('RGa2EGJkaP@X');
    await page.locator('#kc-login').click();
    // Добавил Timeout что бы тест дожидался разблокировки страницы (при стабильном деве достаточно 6 сек)
    await page.waitForTimeout(8_000);
  });

  test('test search alert, ТК-35397', async ({ page }) => {
    await page.locator('.minifyme').click();
    await page.locator('a').filter({ hasText: 'Администрирование' }).click();
    await page.getByRole('link', { name: 'Пользователи' }).click();
    //await expect(url)
    await page.getByRole('textbox', { name: 'E-Mail' }).fill('kukla_92@mainModule.ru');
    await page.getByRole('button', { name: 'Применить' }).click();
    await expect(page.getByRole('cell', { name: 'Нет данных' })).toBeVisible();
  });


  test('Creating a user, ТК-35405', async ({ page }) => { 
    await page.locator('.minifyme').click();
    await page.locator('a').filter({ hasText: 'Администрирование' }).click();
    await page.getByRole('link', { name: 'Пользователи' }).click(); 
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
    await page.locator('#newUserForm').getByRole('textbox', { name: 'Фамилия' }).fill(newUser.fullName);
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
    await page.locator('select[name="level"]').selectOption('string:SHOP');  // не работает, не выбирает уровень, просто кликает и всплывает список 
    // Клик создать пользователя
    //await page.getByRole('button', { name: 'Создать пользователя' }).click();
    // Проверка что в строке поиска отображаеться вновь созданых пользователь
    //await expect(page.getByRole('table')).toContainText(email);
    //await expect(page.getByRole('table')).toContainText(email);
  });

  // test('deaktiv/aktiv template', async ({ page }) => {
  //   await page.getByRole('link', { name: 'Шаблоны задач' }).click();
  //   await page.getByRole('button', { name: 'Деактивировать' }).first().click();
  //   await expect(page.locator('tbody')).toContainText('Активировать');
  //   await page.getByRole('button', { name: 'Активировать' }).first().click();
  //   await expect(page.locator('tbody')).toContainText('Деактивировать');
  // });
});