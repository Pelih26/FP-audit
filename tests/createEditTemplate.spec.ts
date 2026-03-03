import { test, expect } from '@playwright/test';
import { TestTag } from '@pages/testData/enums/TestTag';
import { App } from '@pages/App';
let app: App;


test.describe('Раздел шаблоны', () => {
    test.beforeEach(async ({ page }) => {
        // Добавил общий Timeout что бы тест длилься более 20 сек, пока прогружается главная страница после логина
        test.setTimeout(85_000);
        app = new App(page);
        await app.sideBarMenuPage.open();
    });

    test('Создание нового шаблона', async ({ page }) => {
        await app.templateWizardPage.openTaskSection();
        await app.templateWizardPage.createTemplate();
        await expect(page.locator('#smallbox1')).toContainText('Шаблон успешно создан!');
    });

    test('Поиск созданого шаблона', async ({ page }) => {
        await app.templateWizardPage.openTaskSection();
        await app.templateWizardPage.searchTemplate();
        await expect(page.getByRole('cell', { name: TestTag.TemplateName })).toBeVisible();
    });

    test('Редактирования созданого шаблона', async () => {
        await app.templateWizardPage.openTaskSection();
    });
});
