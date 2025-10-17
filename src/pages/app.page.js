import { MainPage, LoginUser, CreateTask } from './index';

export class App {
  constructor(page) {
    this.page = page;
    this.mainPage = new MainPage(page);
    this.loginUser = new LoginUser(page);
    this.createTask = new CreateTask(page);
  }
}
