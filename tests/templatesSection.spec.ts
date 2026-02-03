import { test, expect } from '@playwright/test';
import { App } from '../support/pages/App';
let app: App;

test.describe('templates section', () => {
    test.beforeEach(async ({ page }) => {
        // Добавил общий Timeout что бы тест длилься более 20 сек, пока прогружается главная страница после логина
        test.setTimeout(85_000);
        app = new App(page);
        await app.mainPage.open();
        await app.loginUser.loginKS();
    });

    test('Тест - Проверки выдачи активных/девктивных шаблонов', async ({ page: _page }) => {
        await app.templateList.openTaskSection();
        await app.templateList.activFlag();
        await app.templateList.verifyTemplatesActivationStatus();
        // Дописать проверку на отображение не активных шаблонов на вебе
    });

    test('Тест - Создание нового шаблона', async ({ page }) => {
        await app.templateList.openTaskSection();
        await app.templateList.createTemplate();
        await expect(page.locator('#smallbox1')).toContainText('Шаблон успешно создан!');
    });

    test('Тест - Поиск созданого шаблона', async ({ page }) => {
        await app.templateList.openTaskSection();
        await app.templateList.searchTemplate();
        await expect(page.getByRole('cell', { name: 'Шаблон АвтотестQA' })).toBeVisible();
    });

    test('Тест - Редактирования созданого шаблона', async ({ page: _page }) => {
        await app.templateList.openTaskSection();
        // Дописать флоу создания - редактирования шаблона
    });
});
