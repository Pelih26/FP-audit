import { BasePage } from './base.page';

export class AdministrationUserPage extends BasePage {
  constructor(page) {
    super(page);

    // Переход по ссылкам меню
    this.administrationLink = page.locator('a').filter({ hasText: 'Администрирование' });
    this.usersLink = page.getByRole('link', { name: 'Пользователи' });

    // Клики по кнопкам
    this.newUserButton = page.getByRole('button', { name: 'Новый пользователь' });
    this.applyButton = page.getByRole('button', { name: 'Применить' });

    // Заполнение импутов
    this.searchInputEmail = page.getByRole('textbox', { name: 'E-Mail' });
    this.loginInput = page.locator('input[name="login"]');
    this.emailUser = page.getByRole('textbox', { name: 'E-mail', exact: true });
    this.firstNameInput = page.locator('#newUserForm').getByRole('textbox', { name: 'Имя' });
    this.lastNameInput = page.locator('#newUserForm').getByRole('textbox', { name: 'Фамилия' });
    this.userPost = page.locator('#newUserForm').getByRole('textbox', { name: 'Должность' });
    this.fullPassword = page.getByRole('textbox', { name: 'Пароль', exact: true });
    this.confirmationPassword = page.getByRole('textbox', { name: 'Подтвердите пароль' });
    this.businessDirection = page.getByLabel('Select box activate');
    this.businessDirectionChoice = page.getByRole('option', { name: 'Не определено' });

    // Элементы поиска
    this.noDataCell = page.getByRole('cell', { name: 'Нет данных' });
  }

  // Переход на страницу Пользователи
  async openUsersSection() {
    await this.click(this.administrationLink);
    await this.click(this.usersLink);
  }

  // Открытие страницы создание нового юзера
  async openCreateUserForm() {
    await this.openUsersSection();
    await this.waitForVisible(this.newUserButton);
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

  async fillUserForm(email, firstName, lastName, fullPassword) {
    await this.click(this.loginInput);
    await this.fill(this.loginInput, email);
    await this.click(this.emailUser);
    await this.fill(this.emailUser, email);
    await this.click(this.firstNameInput);
    await this.fill(this.firstNameInput, firstName);
    await this.click(this.lastNameInput);
    await this.fill(this.lastNameInput, lastName);
    await this.click(this.userPost);
    await this.fill(this.userPost, 'Продавец');
    await this.click(this.fullPassword);
    await this.fill(this.fullPassword, fullPassword);
    await this.click(this.confirmationPassword);
    await this.fill(this.confirmationPassword, fullPassword);
    await this.click(this.businessDirection);
    await this.click(this.businessDirectionChoice);
  }

  // Поиск пользователя по email
  async searchUserByEmail(email) {
    await this.openUsersSection();
    await this.fill(this.searchInputEmail, email);
    await this.click(this.applyButton);
  }
}
