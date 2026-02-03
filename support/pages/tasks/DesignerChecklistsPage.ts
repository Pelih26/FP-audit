import { Page, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage.js';
import { MainPage } from '../base/MainPage.js';

export class TemplateList extends BasePage {
    private readonly mainPage: MainPage;

    // ====== Локаторы ======
    // Переход по ссылкам меню
    private readonly designerLink = this.page.locator('a').filter({ hasText: 'Конструктор чек-листов' });
    private readonly templatesLink = this.page.getByRole('link', { name: ' Шаблоны' });

    // checkbox актив/деактив
    private readonly activationFlag = this.page.getByRole('checkbox', { name: 'Только активные' });

    // Инпут поиска
    private readonly searchInput = this.page.getByRole('textbox', { name: 'Поиск по названию' });

    // Создание/копирование шаблона
    private readonly copyTemplate = this.page.getByRole('button', { name: ' Копировать шаблон' });
    private readonly addTemplateButton = this.page.getByRole('button', { name: ' Добавить' });
    private readonly nameTemplate = this.page.getByRole('textbox', { name: 'Название нового шаблона:' });
    private readonly createTemplateButton = this.page.getByRole('button', { name: 'Создать' });

    // Блок редактирование шаблона
    private readonly redactTemplateButton = this.page.getByRole('button', { name: ' Редактировать' });

    constructor(page: Page) {
        super(page);
        this.mainPage = new MainPage(page);
    }

    // ====== Переход на страницу задачи ======
    async openTaskSection(): Promise<void> {
        await this.mainPage.openMenu();
        await this.click(this.designerLink);
        await this.click(this.templatesLink);
    }

    // ====== Создание нового шаблона ======
    async createTemplate(): Promise<void> {
        await this.click(this.addTemplateButton);
        await this.click(this.nameTemplate);
        await this.fill(this.nameTemplate, 'Шаблон АвтотестQA');
        await this.click(this.createTemplateButton);
    }

    async searchTemplate(): Promise<void> {
        await this.click(this.searchInput);
        await this.fill(this.searchInput, 'Шаблон АвтотестQA');
        await this.searchInput.press('Enter');
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

        // return console.log(responseData);  // Возвращаем ответ
    };
};
