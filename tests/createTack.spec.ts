import { test, expect } from '@playwright/test';
import { TaskType } from '@pages/testData/enums/TaskType';
import { App } from '@pages/App';
let app: App;

test.describe('create task', () => {
    test.beforeEach(async ({ page }) => {
        // Добавил общий Timeout что бы тест длилься более 20 сек, пока прогружается главная страница после логина
        test.setTimeout(65_000);
        app = new App(page);
        await app.sideBarMenuPage.open();
    });

    test('Тест - создание задачи с типом "Общая"', async ({ page }) => {
        await app.createTask.openTaskSection();
        await app.createTask.fillTask(TaskType.Common);
        await expect(page.locator('#smallbox1')).toContainText(
            'Задача будет создана в течение 15 минут');
    });

    test('Тест - создание задачи с типом "Фотоотчёт"', async ({ page }) => {
        await app.createTask.openTaskSection();
        await app.createTask.fillTask(TaskType.PhotoReport);
        await expect(page.locator('#smallbox1')).toContainText(
            'Задача будет создана в течение 15 минут');
    });

    test('Тест - создание задачи с типом "Проверка наличия"', async ({ page }) => {
        await app.createTask.openTaskSection();
        await app.createTask.fillTask(TaskType.Forms);
        await expect(page.locator('#smallbox1')).toContainText(
            'Задача будет создана в течение 15 минут', { timeout: 20_000 });
    });

    test('Тест - создание задачи с типом "Пересчёт товара"', async ({ page }) => {
        await app.createTask.openTaskSection();
        await app.createTask.fillTaskManualRecalculation(TaskType.ManualRecount);
        await expect(page.locator('#smallbox1')).toContainText(
            'Задача будет создана в течение 15 минут');
    });

    test('Тест - создание задачи с типом "Сбор данных"', async ({ page }) => {
        await app.createTask.openTaskSection();
        await app.createTask.fillTaskManualDataCollection(TaskType.ManualDataCollection);
        await expect(page.locator('#smallbox1')).toContainText(
            'Задача будет создана в течение 15 минут');
    });

    test('Тест - создание задачи с типом "Подготовка к инвентаризации"', async ({ page }) => {
        app = new App(page);
        await app.createTask.openTaskSection();
        await app.createTask.fillTaskManualInventory(TaskType.InventoryPreparation);
        await expect(page.locator('#smallbox1')).toContainText(
            'Задача будет создана в течение 15 минут');
    });
});
