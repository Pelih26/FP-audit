import { BasePage } from './base.page.js';

export class AdministrationUserPage extends BasePage {
  constructor(page) {
    super(page);

    // Клики по кнопкам
    this.createUserButton = page.getByRole('button', { name: 'Новый пользователь' });
    this.applyButton = page.getByRole('button', { name: 'Применить' });

    //
    this.firstNameInput = page.locator('[data-test="first-name-input"]');
    this.lastNameInput = page.locator('[data-test="last-name-input"]');
    this.emailInput = page.locator('[data-test="email-input"]');
    this.passwordInput = page.locator('[data-test="password-input"]');
    this.saveBtn = page.locator('[data-test="save-user-button"]');
    this.successMessage = page.locator('[data-test="success-message"]');
  }

  async openPage() {
    await this.open('/administration/users');
  }

  /**
   * Данные заполняют форму создания пользователя
   * @param {string} email - email нового пользователя
   * @param {string} firstName - имя
   * @param {string} lastName - фамилия
   * @param {string} fullPassword - пароль
   */
  async createUser(firstName, lastName, email, password) {
    await this.click(this.createUserBtn);
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.saveBtn);
  }

  async checkUserCreated() {
    await this.waitForVisible(this.successMessage);
  }
}
