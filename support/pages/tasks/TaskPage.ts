import { expect } from '@playwright/test';
import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { MainPage } from '../base/MainPage';

export class CreateTask extends BasePage {
  private readonly mainPage: MainPage;

  // Получение сегодняшней даты для выбора ее в окне календаря при создани задачи
  private readonly formattedDate: string;

  // ====== Локаторы ======
  // Переход по ссылкам меню
  private readonly taskLink = this.page.locator('a').filter({ hasText: 'Задачи' });
  private readonly listLink = this.page.getByRole('link', { name: 'Список задач' });
  private readonly addTask = this.page.getByRole('button', { name: 'Добавить задачу' });

  // Заполнение импутов вкладки - Общая информация
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

  // Заполнение инпутов вкладки - Исполнители
  private readonly performersTab = this.page.locator('div').filter({ hasText: /^Исполнители$/ });
  private readonly storeNumberInput = this.page.getByRole('textbox', {
    name: 'Введите список номеров, разделённый запятыми или пробелами',
  });
  private readonly processingButton = this.page.getByRole('button', { name: 'Обработать' });
  private readonly addExecutorButton = this.page.getByRole('button', {
    name: 'Добавить исполнителей (1)',
  });
  private readonly createButton = this.page.getByRole('button', { name: 'Создать' });

  // Заполнение импутов задачи Пересчёт товара
  private readonly changeButton = this.page.getByRole('button', { name: 'Изменить' });
  private readonly addMultiple = this.page.getByRole('button', {
    name: 'Множественное добавление',
  });
  private readonly selectionProduct = this.page.locator('#textarea-goods-local-codes-textarea');
  private readonly onList = this.page.getByRole('button', { name: 'Включить в список' });
  private readonly applButton = this.page.getByRole('button', { name: 'Применить' });

  // ====== Не обязательные поля ======
  // Вкладка - Общая информация
  private readonly localTime = this.page.locator('.custom-checkbox__check-square').first();
  private readonly deadLineHours = this.page
    .locator('#single-select-task-deadline-time-hours')
    .getByRole('combobox');
  private readonly hours = this.page.getByRole('option', { name: '22' });
  private readonly deadLineMin = this.page
    .locator('#single-select-task-deadline-time-minutes')
    .getByRole('combobox');
  private readonly miutes = this.page.getByRole('option', { name: '05' });

  // Вкладка - Дополнительные параметры
  private readonly advancedSettingsTab = this.page
    .locator('div')
    .filter({ hasText: /^Дополнительные параметры$/ });

  constructor(page: Page) {
    super(page);
    this.mainPage = new MainPage(page);
    this.formattedDate = this.getCurrentDate(); // Используется метод из BasePage
  }

  // ====== Переход на страницу задачи ======
  async openTaskSection(): Promise<void> {
    await this.mainPage.openMenu();
    await this.click(this.taskLink);
    await this.click(this.listLink);
    await expect(this.addTask).toBeVisible({ timeout: 45_000 });
    await this.click(this.addTask);
  }

  // ====== Создание задачи типа Общая/Фотоотчет/Проверка наличия ======
  async fillTask(taskTypeName: string): Promise<void> {
    await this.click(this.inputTaskType);
    const taskTypeOption = this.page.getByRole('option', { name: taskTypeName });
    await this.click(taskTypeOption);

    await this.click(this.inputTaskPriority);
    await this.click(this.inputTaskName);
    await this.fill(this.inputTaskName, taskTypeName + ' АвтотестQA');
    await this.click(this.inputTaskDescription);
    await this.fill(this.inputTaskDescription, taskTypeName + ' АвтотестQA');
    await this.click(this.dataPicker);
    await this.selectCurrentDate();
    await this.performersBlok();
  }

  // ====== Создание задачи типа Пересчет товаров ======
  async fillTaskManualRecalculation(taskTypeRecalculation: string): Promise<void> {
    await this.click(this.inputTaskType);
    const optionRecalculation = this.page.getByRole('option', {
      name: taskTypeRecalculation,
    });
    await this.click(optionRecalculation);
    await this.click(this.inputTaskPriority);
    await expect(this.page.locator('#input-task-name')).toHaveValue(
      `Ручной пересчёт товаров от ${this.formattedDate}`,
    );
    await this.appendTextToInput('#input-task-name', ' АвтотестQA');
    await this.click(this.inputTaskDescription);
    await this.fill(this.inputTaskDescription, taskTypeRecalculation + ' АвтотестQA');
    await this.click(this.dataPicker);
    await this.selectCurrentDate();
    await this.click(this.changeButton);
    await this.click(this.addMultiple);
    await this.click(this.selectionProduct);
    await this.fill(this.selectionProduct, '000000000005562008');
    await this.click(this.onList);
    await this.page.waitForTimeout(600);
    await this.click(this.applButton);
    await this.performersBlok();
  }

  // ====== Создание задачи типа Сбор данных ======
  async fillTaskManualDataCollection(taskTypeDataCollection: string): Promise<void> {
    await this.click(this.inputTaskType);
    const optionDataCollection = this.page.getByRole('option', {
      name: taskTypeDataCollection,
    });
    await this.click(optionDataCollection);
    await this.click(this.inputTaskPriority);
    await expect(this.page.locator('#input-task-name')).toHaveValue(
      'Сбор данных для производственной отчётности',
    );
    await this.appendTextToInput('#input-task-name', ' АвтотестQA');
    await this.click(this.inputTaskDescription);
    await this.fill(this.inputTaskDescription, taskTypeDataCollection + ' АвтотестQA');
    await this.click(this.dataPicker);
    await this.selectCurrentDate();
    await expect(this.page.locator('#collapse_tasks-editor-general-info')).toContainText(
      'ЛИСТОВКИ ЗАКАЗА ТАКСИ MAXIM',
    );
    await this.performersBlok();
  }

  // ====== Создание задачи типа Подготовка к инвентаризации ======
  async fillTaskManualInventory(taskTypeInventory: string): Promise<void> {
    await this.click(this.inputTaskType);
    const optionInventory = this.page.getByRole('option', {
      name: taskTypeInventory,
    });
    await this.click(optionInventory);
    await this.click(this.inputTaskPriority);
    await expect(this.page.locator('#input-task-name')).toHaveValue(
      `Подготовка к инвентаризации от ${this.formattedDate}`,
    );
    await this.appendTextToInput('#input-task-name', ' АвтотестQA');
    await this.click(this.inputTaskDescription);
    await this.fill(this.inputTaskDescription, taskTypeInventory + ' АвтотестQA');
    await this.click(this.dataPicker);
    await this.selectCurrentDate();
    await this.optionalFields();
    await this.performersBlok();
  }

  // Блок - Заполнение не обязательных полей
  async optionalFields(): Promise<void> {
    await this.click(this.localTime);
    await this.click(this.deadLineHours);
    await this.click(this.hours);
    await this.click(this.deadLineMin);
    //await this.click(this.advancedSettingsTab);
  }

  // Перезагрузка страницы
  async reloadPage(taskTypeName: string): Promise<void> {
    await this.page.reload({ waitUntil: 'networkidle' });
    await expect(
      this.page.getByRole('heading', { name: taskTypeName + 'АвтотестQA' }),
    ).toBeVisible();
  }

  // Блок - Заполнение полей вкладки "Исполнители"
  async performersBlok(): Promise<void> {
    await this.click(this.performersTab);
    await this.click(this.storeNumberInput);
    await this.fill(this.storeNumberInput, '2815');
    await this.click(this.processingButton);
    await this.click(this.addExecutorButton);
    await this.click(this.createButton);
  }
}
