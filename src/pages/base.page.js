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

  // Метод кликает и вводит текст в импут
  async fill(element, text) {
    await element.click();
    await element.fill(text);
  }

  // Метод явного ожидания элемента
  async waitForVisible(element, timeout = 5000) {
    await element.waitFor({ state: 'visible', timeout });
  }

  // Метод вызывающий паузу после действия
  async wait(ms) {
    await this.page.waitForTimeout(ms);
  }
}
