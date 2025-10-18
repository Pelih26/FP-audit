import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CreateTask extends BasePage {
  constructor(page) {
    super(page);

    // Получение сегодняшней даты для выбора ее в окне календаря при создани задачи
    const today = new Date();
    const day = today.getDate();

    // ====== Локаторы ======
    // Переход по ссылкам меню
    this.taskLink = page.locator('a').filter({ hasText: 'Задачи' });
    this.listLink = page.getByRole('link', { name: 'Список задач' });
    this.addTask = page.getByRole('button', { name: 'Добавить задачу' });

    // Заполнение импутов вкладки - Общая информация
    this.inputTaskType = page.locator('#single-select-task-type').getByRole('combobox');
    this.inputTaskPriority = page.getByRole('combobox').filter({ hasText: 'Стандартная' });
    this.taskPriority = page.getByRole('option', { name: 'Срочная' });
    this.inputTaskName = page.locator('#input-task-name');
    this.inputTaskDescription = page.locator('#textarea-task-description');
    this.dataPicker = page
      .locator('div')
      .filter({ hasText: /^Установить$/ })
      .nth(4);

    // Кликаем сегодняшнию дату в окне календаря
    this.dateClick = page
      .locator('[data-test*="00:00:00 GMT+0300"]')
      .getByText(day.toString(), { exact: true });
    this.dateChouse = page.getByRole('button', { name: 'Выбрать' });

    // Заполнение инпутов вкладки - Исполнители
    this.performersTab = page.locator('div').filter({ hasText: /^Исполнители$/ });
    this.storeNumberInput = page.getByRole('textbox', {
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

  // ====== Переход на страницу задачи ======
  async openTaskSection() {
    await this.click(this.taskLink);
    await this.click(this.listLink);
    //await this.waitForVisible(this.addTask) // Не работает через Base.page
    await expect(this.addTask).toBeVisible({ timeout: 15_000 }); // Проверка что кнопка стала активной
    await this.click(this.addTask);
  }

  // ====== Создание задачи типа Общая/Фотоотчет/Проверка наличия ======
  async fillTask(taskTypeName) {
    await this.click(this.inputTaskType);
    const taskTypeOption = this.page.getByRole('option', { name: taskTypeName }); // Вставляем тип задачи. Тип задачи прописывсется в самом тесте (файл createTask)
    await this.click(taskTypeOption);

    // Заполнение импутов - Общая информация
    await this.click(this.inputTaskPriority);
    await this.click(this.inputTaskName);
    await this.fill(this.inputTaskName, taskTypeName + ' АвтотестQA');
    await this.click(this.inputTaskDescription);
    await this.fill(this.inputTaskDescription, taskTypeName + ' АвтотестQA');
    await this.click(this.dataPicker);
    await this.click(this.dateClick);
    await this.click(this.dateChouse);

    // Заполнение импутов - Исполнители
    await this.click(this.performersTab);
    await this.click(this.storeNumberInput);
    await this.fill(this.storeNumberInput, '2815');
    await this.click(this.processingButton);
    await this.click(this.addExecutorButton);
    await this.click(this.createButton);
  }

  // ====== Создание задачи типа Пересчет товаров ======
  async fillTaskManualRecalculation(taskTypeRecalculation) {
    await this.click(this.inputTaskType);
    const optionRecalculation = this.page.getByRole('option', {
      name: taskTypeRecalculation,
    });
    await this.click(optionRecalculation);
    await this.click(this.inputTaskPriority);
    await expect(this.page.locator('#input-task-name')).toHaveValue(
      'Ручной пересчёт товаров от 18.10.2025',
    );
    await this.click(this.inputTaskDescription);
    await this.fill(this.inputTaskDescription, taskTypeRecalculation + ' АвтотестQA');
    await this.click(this.dataPicker);
    await this.click(this.dateClick);
    await this.click(this.dateChouse);
    await this.click(this.changeButton);
    await this.click(this.addMultiple);
    await this.click(this.selectionProduct);
    await this.fill(this.selectionProduct, '000000000005562008');
    await this.click(this.onList);
    await this.page.waitForTimeout(600);
    // await expect(this.applButton).toBeVisible({ timeout: 3_000 }); // Не работает !!!!
    await this.click(this.applButton);

    // Заполнение полей вкладки "Исполнители"
    await this.click(this.performersTab);
    await this.click(this.storeNumberInput);
    await this.fill(this.storeNumberInput, '2815');
    await this.click(this.processingButton);
    await this.click(this.addExecutorButton);
    await this.click(this.createButton);
  }

  // ====== Создание задачи типа Сбор данных ======
  async fillTaskManualDataCollection(taskTypeDataCollection) {
    await this.click(this.inputTaskType);
    const optionDataCollection = this.page.getByRole('option', {
      name: taskTypeDataCollection,
    });
    await this.click(optionDataCollection);
    await this.click(this.inputTaskPriority);
    await expect(this.page.locator('#input-task-name')).toHaveValue(
      'Сбор данных для производственной отчётности',
    );
    await this.click(this.inputTaskDescription);
    await this.fill(this.inputTaskDescription, taskTypeDataCollection + ' АвтотестQA');
    await this.click(this.dataPicker);
    await this.click(this.dateClick);
    await this.click(this.dateChouse);
    await expect(this.page.locator('#collapse_tasks-editor-general-info')).toContainText(
      'ЛИСТОВКИ ЗАКАЗА ТАКСИ MAXIM',
    );
    //await this.page.waitForTimeout(2_000);

    // Заполнение полей вкладки "Исполнители"
    await this.click(this.performersTab);
    await this.click(this.storeNumberInput);
    await this.fill(this.storeNumberInput, '3015');
    await this.click(this.processingButton);
    await this.click(this.addExecutorButton);
    await this.click(this.createButton);
  }

  // ====== Создание задачи типа Сбор данных ======
  async fillTaskManualDataCollection(taskTypeDataCollection) {
    await this.click(this.inputTaskType);
    const optionDataCollection = this.page.getByRole('option', {
      name: taskTypeDataCollection,
    });
    await this.click(optionDataCollection);
    await this.click(this.inputTaskPriority);
    await expect(this.page.locator('#input-task-name')).toHaveValue(
      'Сбор данных для производственной отчётности',
    );
    await this.click(this.inputTaskDescription);
    await this.fill(this.inputTaskDescription, taskTypeDataCollection + ' АвтотестQA');
    await this.click(this.dataPicker);
    await this.click(this.dateClick);
    await this.click(this.dateChouse);
    await expect(this.page.locator('#collapse_tasks-editor-general-info')).toContainText(
      'ЛИСТОВКИ ЗАКАЗА ТАКСИ MAXIM',
    );

    // Заполнение полей вкладки "Исполнители"
    await this.click(this.performersTab);
    await this.click(this.storeNumberInput);
    await this.fill(this.storeNumberInput, '3015');
    await this.click(this.processingButton);
    await this.click(this.addExecutorButton);
    await this.click(this.createButton);
  }
}
