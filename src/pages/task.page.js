import { BasePage } from './base.page';

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
    this.taskType = page.locator('.multiselect-option', { hasText: 'Общая' }); // Надо подумать как менять тип задачи
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
    // this.dateClick = page
    //   .locator('[data-test="Sat Oct 11 2025 00:00:00 GMT+0300 (Moscow Standard Time)"]')
    //   .getByText('11', { exact: true }); // Тут надо подумать как дату менять
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
    await this.click(this.taskLink);
    await this.click(this.listLink);
    await this.waitForVisible(this.addTask);
    await this.click(this.addTask);
  }

  // Заполнение полей вкладки "Общая информация"
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

    // Заполнение полей вкладки "Общая информация"
    await this.click(this.performersTab);
    await this.click(this.storeNumberClick);
    await this.fill(this.storeNumberFull, '2815');
    await this.click(this.processingButton);
    await this.click(this.addExecutorButton);
    await this.click(this.createButton);
  }
}
