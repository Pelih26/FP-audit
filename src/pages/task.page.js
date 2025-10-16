import { expect } from '@playwright/test';
import { BasePage } from './base.page';
import { th } from '@faker-js/faker';

export class CreateTask extends BasePage {
  constructor(page) {
    super(page);

    // Получаем сегодняшнюю дату и число
    const today = new Date();
    const day = today.getDate();

    // Переход по ссылкам меню
    this.taskLink = page.locator('a').filter({ hasText: 'Задачи' });
    this.listLink = page.getByRole('link', { name: 'Список задач' });

    // Клик по кнопкам
    this.addTask = page.getByRole('button', { name: 'Добавить задачу' });

    // Заполнение импутов
    this.inputTaskType = page.locator('#single-select-task-type').getByRole('combobox');
    this.inputTaskPriority = page.getByRole('combobox').filter({ hasText: 'Стандартная' });
    this.taskPriority = page.getByRole('option', { name: 'Срочная' });
    this.inputTaskName = page.locator('#input-task-name');
    this.inputTaskDescription = page.locator('#textarea-task-description');
    this.dataPicker = page
      .locator('div')
      .filter({ hasText: /^Установить$/ })
      .nth(4);

    // Кликаем по элементу, у которого текст = сегодняшнее число
    this.dateClick = page
      .locator('[data-test*="00:00:00 GMT+0300"]')
      .getByText(day.toString(), { exact: true });

    this.dateChouse = page.getByRole('button', { name: 'Выбрать' });
    this.performersTab = page.locator('div').filter({ hasText: /^Исполнители$/ });
    this.storeNumberClick = page.getByRole('textbox', {
      name: 'Введите список номеров, разделённый запятыми или пробелами',
    });
    this.storeNumberFull = page.getByRole('textbox', {
      name: 'Введите список номеров, разделённый запятыми или пробелами',
    });
    this.processingButton = page.getByRole('button', { name: 'Обработать' });
    this.addExecutorButton = page.getByRole('button', { name: 'Добавить исполнителей (1)' });
    this.createButton = page.getByRole('button', { name: 'Создать' });

    // Заполнение импутов задачи Пересчёт товара
    this.changeButton = page.getByRole('button', { name: 'Изменить' });
    this.addMultiple = page.getByRole('button', { name: 'Множественное добавление' });
    this.selectionProduct = page.locator('#textarea-goods-local-codes-textarea');
    this.onList = page.getByRole('button', { name: 'Включить в список' });
    this.applButton = page.getByRole('button', { name: 'Применить' });
  }

  // Переход на страницу Список задач
  async openTaskSection() {
    await this.click(this.taskLink);
    await this.click(this.listLink);
    //await this.waitForVisible(this.addTask) // Не работает через Base.page
    await this.page.waitForTimeout(5_000);
    await this.click(this.addTask);
  }

  // Заполнение полей вкладки "Общая информация"
  async fillTask(taskTypeName = 'Общая') {
    await this.click(this.inputTaskType);
    // Вставляем тип задачи. Тип задачи прописывсется в самом тесте (файл createTask)
    const taskTypeOption = this.page.getByRole('option', { name: taskTypeName });
    await this.click(taskTypeOption);
    await this.click(this.inputTaskPriority);
    await this.click(this.inputTaskName);
    await this.fill(this.inputTaskName, taskTypeName + ' АвтотестQA');
    await this.click(this.inputTaskDescription);
    await this.fill(this.inputTaskDescription, taskTypeName + ' АвтотестQA');
    await this.click(this.dataPicker);
    await this.click(this.dateClick);
    await this.click(this.dateChouse);

    // Заполнение полей вкладки "Исполнители"
    await this.click(this.performersTab);
    await this.click(this.storeNumberClick);
    await this.fill(this.storeNumberFull, '2815');
    await this.click(this.processingButton);
    await this.click(this.addExecutorButton);
    await this.click(this.createButton);
  }

  async fillTaskManualRecalculation(taskTypeName2 = 'Пересчёт товара') {
    await this.click(this.inputTaskType);
    const taskTypeOption2 = this.page.getByRole('option', { name: taskTypeName2 });
    await this.click(taskTypeOption2);
    await this.click(this.inputTaskPriority);
    await expect(this.page.locator('#input-task-name')).toHaveValue(
      'Ручной пересчёт товаров от 15.10.2025',
    );
    await this.click(this.inputTaskDescription);
    await this.fill(this.inputTaskDescription, taskTypeName2 + ' АвтотестQA');
    await this.click(this.dataPicker);
    await this.click(this.dateClick);
    await this.click(this.dateChouse);
    await this.click(this.changeButton);
    //await this.click(this.searchСode);
    await this.click(this.addMultiple);
    await this.click(this.selectionProduct);
    await this.fill(this.selectionProduct, '000000000005562008');
    // await this.fill(this.searchСode, '000000000005562008');
    await this.page.waitForTimeout(2_000);
    //await this.click(selectionProduct);
    await this.click(this.onList);
    await this.page.waitForTimeout(2_000);
    await this.click(this.applButton);
    //await this.click(this.performersTab);

    // Заполнение полей вкладки "Исполнители"
    await this.click(this.performersTab);
    await this.click(this.storeNumberClick);
    await this.fill(this.storeNumberFull, '2815');
    await this.click(this.processingButton);
    await this.click(this.addExecutorButton);
    await this.click(this.createButton);
  }
}
