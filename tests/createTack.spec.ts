import { test, expect } from '@playwright/test';
import { TaskType } from '@pages/testData/enums/TaskType';
import { App } from '@pages/App';

let app: App;
const taskNotificationText = 'Задача будет создана в течение 15 минут';

test.describe('Раздел задачи', () => {
    test.beforeEach(async ({ page }) => {
        // Добавил общий Timeout что бы тест длилься более 20 сек, пока прогружается главная страница после логина
        test.setTimeout(65_000);
        app = new App(page);
        await app.sideBarMenuPage.open();
    });

    test('Создание задачи с типом "Общая"', async ({ page }) => {
        await app.tasksAllPage.openTaskSection();
        await app.tasksAllPage.fillTask(TaskType.Common);
        await expect(app.tasksAllPage.notificationCreateTask)
            .toContainText(taskNotificationText);
    });

    test('Создание задачи с типом "Фотоотчёт"', async ({ page }) => {
        await app.tasksAllPage.openTaskSection();
        await app.tasksAllPage.fillTask(TaskType.PhotoReport);
        await expect(app.tasksAllPage.notificationCreateTask)
            .toContainText(taskNotificationText);
    });

    test('Создание задачи с типом "Проверка наличия"', async ({ page }) => {
        await app.tasksAllPage.openTaskSection();
        await app.tasksAllPage.fillTask(TaskType.Forms);
        await expect(app.tasksAllPage.notificationCreateTask)
            .toContainText(taskNotificationText, { timeout: 20_000 });
    });

    test('Создание задачи с типом "Пересчёт товара"', async ({ page }) => {
        await app.tasksAllPage.openTaskSection();
        await app.tasksAllPage.fillTaskManualRecalculation(TaskType.ManualRecount);
        await expect(app.tasksAllPage.notificationCreateTask)
            .toContainText(taskNotificationText);
    });

    test('Создание задачи с типом "Сбор данных"', async ({ page }) => {
        await app.tasksAllPage.openTaskSection();
        await app.tasksAllPage.fillTaskManualDataCollection(TaskType.ManualDataCollection);
        await expect(app.tasksAllPage.notificationCreateTask)
            .toContainText(taskNotificationText);
    });

    test('Создание задачи с типом "Подготовка к инвентаризации"', async ({ page }) => {
        await app.tasksAllPage.openTaskSection();
        await app.tasksAllPage.fillTaskManualInventory(TaskType.InventoryPreparation);
        await expect(app.tasksAllPage.notificationCreateTask)
            .toContainText(taskNotificationText);
    });
});
