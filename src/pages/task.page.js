import { BasePage } from './base.page';

export class CreateTask extends BasePage {
  constructor(page) {
    super(page);

    // Переход по ссылкам меню
    this.taskLink = page.locator('a').filter({ hasText: 'Задачи' });
    this.listLink = page.getByRole('link', { name: 'Список задач' });

    // Клик по кнопкам
    this.addTask = page.getByRole('button', { name: 'Добавить задачу' });

    // Заполнение импутов
    this.inputTaskType = page.locator('#single-select-task-type').getByRole('combobox');
    this.taskType = page.locator('.multiselect-option', { hasText: 'Общая' }); // Надо подумать как менять тип задачи
    this.inputTaskPriority = page.getByRole('combobox').filter({ hasText: 'Стандартная' });
    this.taskPriority = page.getByRole('option', { name: 'Срочная' });
    this.inputTaskName = page.locator('#input-task-name');
    this.inputTaskDescription = page.locator('#textarea-task-description');
    this.dataPicker = page
      .locator('div')
      .filter({ hasText: /^Установить$/ })
      .nth(4);
    this.dateClick = page
      .locator('[data-test="Sat Oct 11 2025 00:00:00 GMT+0300 (Moscow Standard Time)"]')
      .getByText('11', { exact: true }); // Тут надо подумать как дату менять
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
  }

  // Переход на страницу Список задач
  async openTaskSection() {
    await this.taskLink.click();
    await this.listLink.click();
    await this.page.waitForTimeout(2_000);
    await this.addTask.click();
  }

  // Заполнение полей вкладки "Общая информация"
  async fillTask() {
    await this.inputTaskType.click();
    await this.taskType.click();
    await this.inputTaskPriority.click();
    await this.inputTaskName.click();
    await this.inputTaskName.fill('АвтотестQA');
    await this.inputTaskDescription.click();
    await this.inputTaskDescription.fill('АвтотестQA');
    await this.dataPicker.click();
    await this.dateClick.click();
    await this.dateChouse.click();

    // Заполнение полей вкладки "Общая информация"
    await this.performersTab.click();
    await this.storeNumberClick.click();
    await this.storeNumberFull.fill('2815');
    await this.processingButton.click();
    await this.addExecutorButton.click();
    await this.createButton.click();
  }
}
