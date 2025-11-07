import { MainPage, LoginUser, CreateTask, TemplateList } from './index';

export class App {
  constructor(page) {
    this.page = page;
    this.mainPage = new MainPage(page);
    this.loginUser = new LoginUser(page);
    this.createTask = new CreateTask(page);
    this.templateList = new TemplateList(page);
  }
}
