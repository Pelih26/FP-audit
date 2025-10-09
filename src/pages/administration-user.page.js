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

    // Импуты с данными
    this.searchInpytEmail = page.getByRole('textbox', { name: 'E-Mail' });
    this.loginInput = page.locator('input[name="login"]');
    this.emailUser = page.getByRole('textbox', { name: 'E-mail', exact: true });
    this.firstName = page.locator('#newUserForm').getByRole('textbox', { name: 'Имя' });
    this.lastName = page.locator('#newUserForm').getByRole('textbox', { name: 'Фамилия' });
    this.UserPost = page.locator('#newUserForm').getByRole('textbox', { name: 'Должность' });
    this.fullPassword = page.getByRole('textbox', { name: 'Пароль', exact: true });
    this.confirmationPassword = page.getByRole('textbox', { name: 'Подтвердите пароль' });
    this.businessDirection = page.getByLabel('Select box activate');
    this.businessDirectionChoice = page.getByRole('option', { name: 'Не определено' });

    // Элементы поиска
    this.noDataCell = page.getByRole('cell', { name: 'Нет данных' });
  }

  // Переход на страницу Пользователи
  async openUsersSection() {
    await this.administrationLink.click();
    await this.usersLink.click();
  }

  // Открытие страницы создание нового юзера
  async openCreateUserForm() {
    await this.openUsersSection();
    await this.newUserButton.click();
  }

  // Генерация нового пользователя
  async fillUserForm(email, firstName, lastName, fullPassword) {
    await this.loginInput.click();
    await this.loginInput.fill(email);
    await this.emailUser.click();
    await this.emailUser.fill(email);
    await this.firstName.click();
    await this.firstName.fill(firstName);
    await this.lastName.click();
    await this.lastName.fill(lastName);
    await this.UserPost.click();
    await this.UserPost.fill('Продавец');
    await this.fullPassword.click();
    await this.fullPassword.fill(fullPassword);
    await this.confirmationPassword.click();
    await this.confirmationPassword.fill(fullPassword);
    await this.businessDirection.click();
    await this.businessDirectionChoice.click();
  }

  // Поиск пользователя по email
  async searchUserByEmail(email) {
    await this.openUsersSection;
    await this.searchInpytEmail.fill(email);
    await this.applyButton.click();
  }
}

