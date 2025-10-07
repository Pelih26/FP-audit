import { test, expect } from '@playwright/test';
// Импорт Faker с русской локалью
import { fakerRU as faker } from '@faker-js/faker';
import { MainPage, CreateUserPage, LoginUser } from '../src/pages/index';
const url = 'https://audit-dev9.fix-price.ru/#/login';

let text_input = faker.lorem.text();
let mainPage;
let loginUser;

test.describe('templates section', () => {
  test.beforeEach(async ({ page }) => {
    // Добавил общий Timeout что бы тест длилься более 20 сек, пока прогружается главная страница после логина
    test.setTimeout(25_000);
    mainPage = new MainPage(page);
    loginUser = new LoginUser(page);
    await mainPage.open(url);
    await loginUser.loginKS();
    // Добавил Timeout что бы тест дожидался разблокировки страницы (при стабильном деве достаточно 6 сек)
    await page.waitForTimeout(8_000);
  });

  test('test search template, ТК-31423', async ({ page }) => {
    await page.locator('.minifyme').click();
    await page.getByRole('link', { name: 'Шаблоны задач' }).click();
    await page.getByRole('textbox', { name: 'Поиск по названию' }).click();
    await page.getByRole('textbox', { name: 'Поиск по названию' }).fill('Фотоотчет');
    await page.getByRole('textbox', { name: 'Поиск по названию' }).press('Enter');
    await expect(page.locator('tbody')).toContainText('Произвольный фотоотчет');
  });

  // Здесь надо написать тест на создание шаблона
  // test('update template, ТК-31424', async ({ page }) => {
  //   let text_input = faker.lorem.text();
  //   await page.locator('.minifyme').click();
  //   await page.getByRole('link', { name: ' Шаблоны задач' }).click();
  //   await page.getByRole('button', { name: ' Редактировать' }).first().click();
  //   await page.getByRole('textbox', { name: 'Введите описание *' }).click();
  //   await page.getByRole('textbox', { name: 'Введите описание *' }).fill(text_input);
  //   await page.getByRole('button', { name: 'Сохранить шаблон' }).click();
  //   await expect(page.locator('#smallbox1')).toContainText('Шаблон задачи успешно изменён');
  //   })

  test('update template, ТК-31426', async ({ page }) => {
    await page.locator('.minifyme').click();
    await page.getByRole('link', { name: 'Шаблоны задач' }).click();
    await page.getByRole('button', { name: ' Редактировать' }).first().click();
    await page.getByRole('textbox', { name: 'Введите описание' }).click();
    await page.getByRole('textbox', { name: 'Введите описание' }).fill(text_input);
    await page.getByRole('button', { name: 'Сохранить шаблон' }).click();
    await expect(page.locator('#smallbox1')).toContainText('Шаблон задачи успешно изменён');
  });

  test('deaktiv/aktiv template, ТК-31427/31428', async ({ page }) => {
    await page.locator('.minifyme').click();
    await page.getByRole('link', { name: 'Шаблоны задач' }).click();
    await page.getByRole('button', { name: 'Деактивировать' }).first().click();
    await expect(page.locator('tbody')).toContainText('Активировать');
    await page.getByRole('button', { name: 'Активировать' }).first().click();
    await expect(page.locator('tbody')).toContainText('Деактивировать');
  });
});
