import { expect, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage.js';

export class TemplateList extends BasePage {
  // ====== Локаторы ======
  // Переход по ссылкам меню
  designerLink: import('@playwright/test').Locator;
  templatesLink: import('@playwright/test').Locator;

  // checkbox актив/деактив
  activationFlag: import('@playwright/test').Locator;

  constructor(page: Page) {
    super(page);

    // ====== Локаторы ======
    // Переход по ссылкам меню
    this.designerLink = page.locator('a').filter({ hasText: 'Конструктор чек-листов' });
    this.templatesLink = page.getByRole('link', { name: ' Шаблоны' });

    // checkbox актив/деактив
    this.activationFlag = page.getByRole('checkbox', { name: 'Только активные' });
  }

  // ====== Переход на страницу задачи ======
  async openTaskSection(): Promise<void> {
    await this.click(this.designerLink);
    await this.click(this.templatesLink);
  }

  // ====== checkbox актив/деактив ======
  async activFlag(): Promise<void> {
    await this.activationFlag.uncheck();
    //await this.activationFlag.check();
  }

  // ====== Проверка активных/неактивных шаблонов через API ======
  async verifyTemplatesActivationStatus(): Promise<void> {
    const apiResponse = await this.page.request.get('/api/admin/constructor/templates');
    expect(apiResponse.ok()).toBeTruthy();

    const responseData = await apiResponse.json();

    //const hasActiveTemplates = responseData.some((template) => template.active === true);
    const hasInactiveTemplates = responseData.some((template: any) => template.active === false);

    //expect(hasActiveTemplates, 'Проверка актив шаблонов').toBeTruthy();
    expect(hasInactiveTemplates, 'Проверка не актив шаблонов').toBeTruthy();

    return console.log(responseData);
  }
}