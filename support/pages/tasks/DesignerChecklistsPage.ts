import { Page } from '@playwright/test';
import { BasePage } from '@pages/base/BasePage';
import { SideBarMenuPage } from '@pages/base/SideBarMenuPage';
import { TestTag } from '@pages/testData/enums/TestTag';

export class TemplateList extends BasePage {
    private readonly SideBarMenuPage: SideBarMenuPage;

    private readonly designerLink = this.page.locator('a').filter({ hasText: 'Конструктор чек-листов' });
    private readonly templatesLink = this.page.getByRole('link', { name: ' Шаблоны' });
    private readonly activationFlag = this.page.getByRole('checkbox', { name: 'Только активные' });
    private readonly searchInput = this.page.getByRole('textbox', { name: 'Поиск по названию' });
    private readonly addTemplateButton = this.page.getByRole('button', { name: ' Добавить' });
    private readonly nameTemplate = this.page.getByRole('textbox', { name: 'Название нового шаблона:' });
    private readonly createTemplateButton = this.page.getByRole('button', { name: 'Создать' });

    constructor(page: Page) {
        super(page);
        this.SideBarMenuPage = new SideBarMenuPage(page);
    }

    async openTaskSection(): Promise<void> {
        await this.SideBarMenuPage.openMenu();
        await this.designerLink.click();
        await this.templatesLink.click();
    }

    async createTemplate(): Promise<void> {
        await this.addTemplateButton.click();
        await this.nameTemplate.click();
        await this.nameTemplate.fill(TestTag.TemplateName);
        await this.createTemplateButton.click();
    }

    async searchTemplate(): Promise<void> {
        await this.searchInput.click();
        await this.searchInput.fill(TestTag.TemplateName);
        await this.searchInput.press('Enter');
    }

    async activFlag(): Promise<void> {
        await this.activationFlag.uncheck();
    }
};
