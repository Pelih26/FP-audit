import { Page, expect } from '@playwright/test';
import { MainPage } from '@pages/base/MainPage';
import { HelperData } from '@utils/HelperData';
import { TestTag } from '@pages/testData/enums/TestTag';
import { TaskType } from '@pages/testData/enums/TaskType';

export class CreateTask extends HelperData {
    private readonly mainPage: MainPage;
    private readonly formattedDate: string;

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
    constructor(page: Page) {
        super(page);
        this.mainPage = new MainPage(page);
        this.formattedDate = this.getCurrentDate(); // Используется метод из BasePage
    }

    async openTaskSection(): Promise<void> {
        await this.mainPage.openMenu();
        await this.taskLink.click();
        await this.listLink.click();
        await expect(this.addTask).toBeVisible({ timeout: 45_000 });
        await this.addTask.click();
    }

    async fillTask(taskType: TaskType): Promise<void> {
        await this.inputTaskType.click();
        const taskTypeOption = this.page.getByRole('option', { name: taskType });
        await taskTypeOption.click();
        await this.inputTaskPriority.click();
        await this.inputTaskName.click();
        await this.inputTaskName.fill(`${taskType} ${TestTag.QA_AUTOMATION}`);
        await this.inputTaskDescription.click();
        await this.inputTaskDescription.fill(`${taskType} ${TestTag.QA_AUTOMATION}`);
        await this.dataPicker.click();
        await this.selectCurrentDate();
        await this.performersBlok();
    }

    async fillTaskManualRecalculation(taskType: TaskType): Promise<void> {
        await this.inputTaskType.click();
        const optionRecalculation = this.page.getByRole('option', {
            name: taskType,
        });
        await optionRecalculation.click();
        await this.inputTaskPriority.click();
        await expect(this.page.locator('#input-task-name')).toHaveValue(
            `Ручной пересчёт товаров от ${this.formattedDate}`);
        await this.appendTextToInput('#input-task-name', ` ${TestTag.QA_AUTOMATION}`);
        await this.inputTaskDescription.click();
        await this.inputTaskDescription.fill(`${taskType} ${TestTag.QA_AUTOMATION}`);
        await this.dataPicker.click();
        await this.selectCurrentDate();
        await this.changeButton.click();
        await this.addMultiple.click();
        await this.selectionProduct.click();
        await this.selectionProduct.fill('000000000005562008');
        await this.onList.click();
        await this.page.waitForTimeout(600);
        await this.applButton.click();
        await this.performersBlok();
    }

    async fillTaskManualDataCollection(taskType: TaskType): Promise<void> {
        await this.inputTaskType.click();
        const optionDataCollection = this.page.getByRole('option', { name: taskType });
        await optionDataCollection.click();
        await this.inputTaskPriority.click();
        await expect(this.page.locator('#input-task-name')).toHaveValue('Сбор данных для производственной отчётности');
        await this.appendTextToInput('#input-task-name', ` ${TestTag.QA_AUTOMATION}`);
        await this.inputTaskDescription.click();
        await this.inputTaskDescription.fill(`${taskType} ${TestTag.QA_AUTOMATION}`);
        await this.dataPicker.click();
        await this.selectCurrentDate();
        await expect(this.page.locator('#collapse_tasks-editor-general-info')).toContainText('ЛИСТОВКИ ЗАКАЗА ТАКСИ MAXIM');
        await this.performersBlok();
    }

    async fillTaskManualInventory(taskType: TaskType): Promise<void> {
        await this.inputTaskType.click();
        const optionInventory = this.page.getByRole('option', { name:taskType });
        await optionInventory.click();
        await this.inputTaskPriority.click();
        await expect(this.page.locator('#input-task-name')).toHaveValue(`Подготовка к инвентаризации от ${this.formattedDate}`);
        await this.appendTextToInput('#input-task-name', ` ${TestTag.QA_AUTOMATION}`);
        await this.inputTaskDescription.click();
        await this.inputTaskDescription.fill(`${taskType} ${TestTag.QA_AUTOMATION}`);
        await this.dataPicker.click();
        await this.selectCurrentDate();
        await this.optionalFields();
        await this.performersBlok();
    }

    async optionalFields(): Promise<void> {
        await this.localTime.click();
        await this.deadLineHours.click();
        await this.hours.click();
        await this.deadLineMin.click();
        //await this.advancedSettingsTab.click());
    }

    async reloadPage(taskTypeName: string): Promise<void> {
        await this.page.reload({ waitUntil: 'networkidle' });
        await expect(this.page.getByRole('heading', { name: taskTypeName + 'АвтотестQA' })).toBeVisible();
    }

    // Блок - Заполнение полей вкладки "Исполнители"
    async performersBlok(): Promise<void> {
        await this.performersTab.click();
        await this.storeNumberInput.click();
        await this.storeNumberInput.fill('2815');
        await this.processingButton.click();
        await this.addExecutorButton.click();
        await this.createButton.click();
    }
}
