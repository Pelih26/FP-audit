import { Page, expect } from '@playwright/test';
import { SideBarMenuPage } from '@pages/base/SideBarMenuPage';
import { HelperData } from '@utilities/HelperData';
import { TestTag } from '@pages/testData/enums/TestTag';
import { TaskType } from '@pages/testData/enums/TaskType';
import { BasePage } from '@pages/base/BasePage';

export class TasksAllPage extends BasePage {
    private readonly sideBarMenuPage: SideBarMenuPage;
    private readonly formattedDate: string;
    private readonly helperData: HelperData;

    private readonly taskLink = this.page.locator('a').filter({ hasText: 'Задачи' });
    private readonly listLink = this.page.getByRole('link', { name: 'Список задач' });
    private readonly addTask = this.page.getByRole('button', { name: 'Добавить задачу' });
    private readonly inputTaskType = this.page
        .locator('#single-select-task-type')
        .getByRole('combobox');
    private readonly inputTaskPriority = this.page
        .getByRole('combobox')
        .filter({ hasText: 'Стандартная' });
    private readonly taskPriority = this.page.getByRole('option', { name: 'Срочная' });
    private readonly inputTaskName = this.page.locator('#input-task-name');
    private readonly inputTaskDescription = this.page.locator('#textarea-task-description');
    private readonly dataPicker = this.page
        .locator('div')
        .filter({ hasText: /^Установить$/ })
        .nth(4);
    private readonly performersTab = this.page.locator('div').filter({ hasText: /^Исполнители$/ });
    private readonly storeNumberInput = this.page.getByRole('textbox', {
        name: 'Введите список номеров, разделённый запятыми или пробелами' });
    private readonly processingButton = this.page.getByRole('button', { name: 'Обработать' });
    private readonly addExecutorButton = this.page.getByRole('button', {
        name: 'Добавить исполнителей (1)' });
    private readonly createButton = this.page.getByRole('button', { name: 'Создать' });
    private readonly changeButton = this.page.getByRole('button', { name: 'Изменить' });
    private readonly addMultiple = this.page.getByRole('button', { name: 'Множественное добавление' });
    private readonly selectionProduct = this.page.locator('#textarea-goods-local-codes-textarea');
    private readonly onList = this.page.getByRole('button', { name: 'Включить в список' });
    private readonly applButton = this.page.getByRole('button', { name: 'Применить' });
    private readonly localTime = this.page.locator('.custom-checkbox__check-square').first();
    private readonly deadLineHours = this.page
        .locator('#single-select-task-deadline-time-hours')
        .getByRole('combobox');
    private readonly hours = this.page.getByRole('option', { name: '22' });
    private readonly deadLineMin = this.page
        .locator('#single-select-task-deadline-time-minutes')
        .getByRole('combobox');
    private readonly miutes = this.page.getByRole('option', { name: '05' });
    private readonly advancedSettingsTab = this.page
        .locator('div')
        .filter({ hasText: /^Дополнительные параметры$/ });
    readonly notificationCreateTask = this.page.locator('#smallbox1');

    constructor(page: Page) {
        super(page);
        this.sideBarMenuPage = new SideBarMenuPage(page);
        this.helperData = new HelperData(page);
        this.formattedDate = this.helperData.getCurrentDate();
    }

        async openTaskSection(): Promise<void> {
        await this.sideBarMenuPage.openMenu();
        await this.click(this.taskLink);
        await this.click(this.listLink);
        await this.waitForLoaderToDisappear();
        await this.click(this.addTask);
    }

    private async selectTaskType(taskType: TaskType): Promise<void> {
        await this.click(this.inputTaskType);
        await this.click(this.page.getByRole('option', { name: taskType }));
    }

    private async fillNameAndDescription(name: string, description: string): Promise<void> {
        await this.click(this.inputTaskName);
        await this.fill(this.inputTaskName, name);
        await this.click(this.inputTaskDescription);
        await this.fill(this.inputTaskDescription, description);
    }

    private async selectCurrentDate(): Promise<void> {
        await this.click(this.dataPicker);
        await this.helperData.selectCurrentDate();
    }

    private async fillPerformersAndCreate(): Promise<void> {
        await this.click(this.performersTab);
        await this.click(this.storeNumberInput);
        await this.fill(this.storeNumberInput, '3015');
        await this.click(this.processingButton);
        await this.click(this.addExecutorButton);
        await this.click(this.createButton);
    }

    async fillTask(taskType: TaskType): Promise<void> {
        await this.selectTaskType(taskType);
        await this.fillNameAndDescription(
            `${taskType} ${TestTag.QaSuffix}`,
            `${taskType} ${TestTag.QaSuffix}`
        );
        await this.selectCurrentDate();
        await this.fillPerformersAndCreate();
    }

    async fillTaskManualDataCollection(taskType: TaskType): Promise<void> {
        await this.selectTaskType(taskType);
        await expect(this.inputTaskName)
            .toHaveValue('Сбор данных для производственной отчётности');
        await this.helperData.appendTextToInput('#input-task-name', ` ${TestTag.QaSuffix}`);
        await this.fill(this.inputTaskDescription, `${taskType} ${TestTag.QaSuffix}`);
        await this.selectCurrentDate();
        await expect(
            this.page.locator('#collapse_tasks-editor-general-info')
        ).toContainText('ЛИСТОВКИ ЗАКАЗА ТАКСИ MAXIM');
        await this.fillPerformersAndCreate();
    }

    async fillTaskManualRecalculation(taskType: TaskType): Promise<void> {
        await this.selectTaskType(taskType);
        await expect(this.inputTaskName).toHaveValue(`Ручной пересчёт товаров от ${this.formattedDate}`);
        await this.helperData.appendTextToInput('#input-task-name',` ${TestTag.QaSuffix}`);
        await this.fill(this.inputTaskDescription, `${taskType} ${TestTag.QaSuffix}`);
        await this.selectCurrentDate();
        await this.click(this.changeButton);
        await this.click(this.addMultiple);
        await this.fill(this.selectionProduct, '000000000005562008');
        await this.click(this.onList);
        await this.page.waitForTimeout(600);
        await this.click(this.applButton);
        await this.fillPerformersAndCreate();
    }

    async fillTaskManualInventory(taskType: TaskType): Promise<void> {
        await this.selectTaskType(taskType);
        await expect(this.inputTaskName).toHaveValue(
            `Подготовка к инвентаризации от ${this.formattedDate}`
        );
        await this.helperData.appendTextToInput('#input-task-name', ` ${TestTag.QaSuffix}`);
        await this.fill(this.inputTaskDescription, `${taskType} ${TestTag.QaSuffix}`);
        await this.selectCurrentDate();
        await this.fillOptionalFields();
        await this.fillPerformersAndCreate();
    }

    private async fillOptionalFields(): Promise<void> {
        await this.click(this.localTime);
        await this.click(this.deadLineHours);
        await this.click(this.hours);
        await this.click(this.deadLineMin);
    }

    async reloadPage(taskTypeName: string): Promise<void> {
        await this.page.reload({ waitUntil: 'networkidle' });
        await expect(this.page.getByRole('heading', {
            name: taskTypeName + TestTag.QaSuffix
        })).toBeVisible();
    }
}
