export class BasePage {
  constructor(page) {
    this.page = page;
  }

  // Метод открытия страницы
  async open(url) {
    await this.page.goto(url);
  }

  // Метод делает клики по кнопкам
  async click(element) {
    await element.click();
  }

  // Метод вводит текст в импут
  async fill(element, text) {
    await element.fill(text);
  }

  // Метод генерации даты для подставновки в локатор
  getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}.${month}.${year}`;
  }

  async appendTextToInput(locator, text) {
    const input = this.page.locator(locator);
    const currentValue = await input.inputValue(); // Tекущее значение инпута
    await input.fill(currentValue + text);
  }
  /*
  async wait(ms) {
    await this.page.waitForTimeout(3_000);
  }

  
    Если раскомментировать появляется бесконечный спинер при клике на вкладку "Исполнители", при заведение задачи
  // Метод явного ожидания элемента
  async waitForVisible(element, timeout = 3_000) {
    await element.waitFor({ state: 'visible', timeout });
  }

  // Метод вызывающий паузу после действия
  async wait(ms) {
    await this.page.waitForTimeout(3_000);
  }
  */
}
