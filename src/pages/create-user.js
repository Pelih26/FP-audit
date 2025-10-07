import { BasePage } from './base.page';

export class CreateUserPage extends BasePage {
  constructor(page) {
    super(page);
    this.administrationLink = this.page.locator('a').filter({ hasText: 'Администрирование' });
    this.usersLink = this.page.getByRole('link', { name: 'Пользователи' });
    this.newUserButton = this.page.getByRole('button', { name: 'Новый пользователь' });
    this.loginInput = this.page.locator('input[name="login"]');
    this.emailUser = this.page.getByRole('textbox', { name: 'E-mail', exact: true });
    this.firstName = this.page.locator('#newUserForm').getByRole('textbox', { name: 'Имя' });
    this.lastName = this.page.locator('#newUserForm').getByRole('textbox', { name: 'Фамилия' });
    this.UserPost = this.page.locator('#newUserForm').getByRole('textbox', { name: 'Должность' });
    this.fullPassword = this.page.getByRole('textbox', { name: 'Пароль', exact: true });
    this.confirmationPassword = this.page.getByRole('textbox', { name: 'Подтвердите пароль' });
    this.businessDirection = this.page.getByLabel('Select box activate');
    this.businessDirectionChoice = this.page.getByRole('option', { name: 'Не определено' });
  }

  async openCreateUserForm() {
    await this.administrationLink.click();
    await this.usersLink.click();
    await this.newUserButton.click();
  }

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
}
