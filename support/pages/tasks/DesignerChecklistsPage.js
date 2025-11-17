import { test, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage.js';

export class TemplateList extends BasePage {
  constructor(page) {
    super(page);

    // ====== Локаторы ======
    // Переход по ссылкам меню
    this.designerLink = page.locator('a').filter({ hasText: 'Конструктор чек-листов' });
    this.templatesLink = page.getByRole('link', { name: ' Шаблоны' });

    // checkbox актив/деактив
    this.activationFlag = page.getByRole('checkbox', { name: 'Только активные' });
  }

  // ====== Переход на страницу задачи ======
  async openTaskSection() {
    await this.click(this.designerLink);
    await this.click(this.templatesLink);
  }

  // ====== checkbox актив/деактив ======
  async activFlag() {
    await this.activationFlag.uncheck();
    //await this.activationFlag.check();
  }
  // ====== Проверка активных/неактивных шаблонов через API ======
  async verifyTemplatesActivationStatus() {
    const apiResponse = await this.page.request.get('/api/admin/constructor/templates');
    expect(apiResponse.ok()).toBeTruthy();

    const responseData = await apiResponse.json();

    //const hasActiveTemplates = responseData.some((template) => template.active === true);
    const hasInactiveTemplates = responseData.some((template) => template.active === false);

    //expect(hasActiveTemplates, 'Проверка актив шаблонов').toBeTruthy();
    expect(hasInactiveTemplates, 'Проверка не актив шаблонов').toBeTruthy();

    return console.log(responseData);
  }
}
