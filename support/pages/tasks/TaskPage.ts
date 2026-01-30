import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage.js';

export class CreateTask extends BasePage {
    private readonly taskLink = this.page.locator('a').filter({ hasText: 'Задачи' });
    private readonly listLink = this.page.getByRole('link', { name: 'Список задач' });
    private readonly addTask = this.page.getByRole('button', { name: 'Добавить задачу' });
    private readonly inputTaskType = this.page
        .locator('#single-select-task-type')
        .getByRole('combobox');
    private readonly taskType = this.page.locator('.multiselect-option', { hasText: 'Общая' });
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
    private readonly dateClick = this.page
        .locator('[data-test="Sat Oct 11 2025 00:00:00 GMT+0300 (Moscow Standard Time)"]')
        .getByText('11', { exact: true });
    private readonly dateChouse = this.page.getByRole('button', { name: 'Выбрать' });
    private readonly performersTab = this.page.locator('div').filter({ hasText: /^Исполнители$/ });
    private readonly storeNumberClick = this.page.getByRole('textbox', {
        name: 'Введите список номеров, разделённый запятыми или пробелами',
    });
    private readonly storeNumberFull = this.page.getByRole('textbox', {
        name: 'Введите список номеров, разделённый запятыми или пробелами',
    });
    private readonly processingButton = this.page.getByRole('button', { name: 'Обработать' });
    private readonly addExecutorButton = this.page.getByRole('button', { name: 'Добавить исполнителей (1)' });
    private readonly createButton = this.page.getByRole('button', { name: 'Создать' });

    constructor(page: Page) {
        super(page);
    }

    async openTaskSection() {
        await this.click(this.taskLink);
        await this.click(this.listLink);
        await this.click(this.addTask);
    }

    async fillTask() {
        await this.click(this.inputTaskType);
        await this.click(this.taskType);
        await this.click(this.inputTaskPriority);
        await this.click(this.inputTaskName);
        await this.fill(this.inputTaskName, 'АвтотестQA');
        await this.click(this.inputTaskDescription);
        await this.fill(this.inputTaskDescription, 'АвтотестQA');
        await this.click(this.dataPicker);
        await this.click(this.dateClick);
        await this.click(this.dateChouse);

        await this.click(this.performersTab);
        await this.click(this.storeNumberClick);
        await this.fill(this.storeNumberFull, '2815');
        await this.click(this.processingButton);
        await this.click(this.addExecutorButton);
        await this.click(this.createButton);
    }
}