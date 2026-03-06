import { test, expect } from '@playwright/test';
import { TestTag } from '@pages/testData/enums/TestTag';
import { App } from '@pages/App';
let app: App;


<<<<<<< HEAD
test.describe('Раздел шаблоны', () => {
=======
test.describe('templates section', () => {
>>>>>>> e504130148c50edc5a1eb96b9f098d5d1d4e0b4f
    test.beforeEach(async ({ page }) => {
        // Добавил общий Timeout что бы тест длилься более 20 сек, пока прогружается главная страница после логина
        test.setTimeout(85_000);
        app = new App(page);
        await app.sideBarMenuPage.open();
    });

<<<<<<< HEAD
    test('Создание нового шаблона', async ({ page }) => {
=======
    test('Тест - Создание нового шаблона', async ({ page }) => {
>>>>>>> e504130148c50edc5a1eb96b9f098d5d1d4e0b4f
        await app.templateWizardPage.openTaskSection();
        await app.templateWizardPage.createTemplate();
        await expect(page.locator('#smallbox1')).toContainText('Шаблон успешно создан!');
    });

<<<<<<< HEAD
    test('Поиск созданого шаблона', async ({ page }) => {
=======
    test('Тест - Поиск созданого шаблона', async ({ page }) => {
>>>>>>> e504130148c50edc5a1eb96b9f098d5d1d4e0b4f
        await app.templateWizardPage.openTaskSection();
        await app.templateWizardPage.searchTemplate();
        await expect(page.getByRole('cell', { name: TestTag.TemplateName })).toBeVisible();
    });

<<<<<<< HEAD
    test('Редактирования созданого шаблона', async () => {
=======
    test('Тест - Редактирования созданого шаблона', async () => {
>>>>>>> e504130148c50edc5a1eb96b9f098d5d1d4e0b4f
        await app.templateWizardPage.openTaskSection();
    });
});
