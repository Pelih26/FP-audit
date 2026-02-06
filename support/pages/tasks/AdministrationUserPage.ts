import { Page } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';

export class AdministrationUserPage extends BasePage {
  // Переход по ссылкам меню
  administrationLink: import('@playwright/test').Locator;
  usersLink: import('@playwright/test').Locator;

  // Клики по кнопкам
  newUserButton: import('@playwright/test').Locator;
  applyButton: import('@playwright/test').Locator;

  // Заполнение импутов
  searchInputEmail: import('@playwright/test').Locator;
  loginInput: import('@playwright/test').Locator;
  emailUser: import('@playwright/test').Locator;
  firstNameInput: import('@playwright/test').Locator;
  lastNameInput: import('@playwright/test').Locator;
  userPost: import('@playwright/test').Locator;
  fullPassword: import('@playwright/test').Locator;
  confirmationPassword: import('@playwright/test').Locator;
  businessDirection: import('@playwright/test').Locator;
  businessDirectionChoice: import('@playwright/test').Locator;

  // Элементы поиска
  noDataCell: import('@playwright/test').Locator;

  constructor(page: Page) {
    super(page);

    // Переход по ссылкам меню
    this.administrationLink = page.locator('a').filter({ hasText: 'Администрирование' });
    this.usersLink = page.getByRole('link', { name: 'Пользователи' });

    // Клики по кнопкам
    this.newUserButton = page.getByRole('button', { name: 'Новый пользователь' });
    this.applyButton = page.getByRole('button', { name: 'Применить' });

    // Заполнение импутов
    this.searchInputEmail = page.getByRole('textbox', { name: 'E-Mail' });
    this.loginInput = page.locator('#input-newuser-login');
    this.emailUser = page.locator('#input-newuser-email');
    this.firstNameInput = page.locator('#input-newuser-first-name');
    this.lastNameInput = page.locator('#input-newuser-last-name');
    this.userPost = page.locator('#newUserForm').getByRole('textbox', { name: 'Должность' });
    this.fullPassword = page.getByRole('textbox', { name: 'Пароль', exact: true });
    this.confirmationPassword = page.getByRole('textbox', { name: 'Подтвердите пароль' });
    this.businessDirection = page.getByLabel('Select box activate');
    this.businessDirectionChoice = page.getByRole('option', { name: 'Не определено' });

    // Элементы поиска
    this.noDataCell = page.getByRole('cell', { name: 'Нет данных' });
  }

  // Переход на страницу Пользователи
  async openUsersSection(): Promise<void> {
    await this.click(this.administrationLink);
    await this.click(this.usersLink);
  }

  // Открытие страницы создание нового юзера
  async openCreateUserForm(): Promise<void> {
    await this.openUsersSection();
    //await this.waitForVisible(this.newUserButton);
    // await this.wait(2000);
    await this.click(this.newUserButton);
  }

  /**
   * Заполняет форму создания пользователя, генерация происхоит через Faker
   * @param {string} email - email нового пользователя
   * @param {string} firstName - имя
   * @param {string} lastName - фамилия
   * @param {string} fullPassword - пароль
   */
  async fillUserForm(newUser: any): Promise<void> {
    await this.click(this.loginInput);
    await this.fill(this.loginInput, newUser.email);
    await this.click(this.emailUser);
    await this.fill(this.emailUser, newUser.email);
    await this.click(this.firstNameInput);
    await this.fill(this.firstNameInput, newUser.firstName);
    await this.click(this.lastNameInput);
    await this.fill(this.lastNameInput, newUser.lastName);
    await this.click(this.userPost);
    await this.fill(this.userPost, 'Продавец');
    await this.click(this.fullPassword);
    await this.fill(this.fullPassword, newUser.fullPassword);
    await this.click(this.confirmationPassword);
    await this.fill(this.confirmationPassword, newUser.fullPassword);
    await this.click(this.businessDirection);
    await this.click(this.businessDirectionChoice);
  }

  // Поиск пользователя по email
  async searchUserByEmail(newUser: any): Promise<void> {
    await this.openUsersSection();
    await this.fill(this.searchInputEmail, newUser.email);
    await this.click(this.applyButton);
  }
}