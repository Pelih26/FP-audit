import { Page } from '@playwright/test';
import { MainPage, LoginUser, TemplateList, CreateTask } from './index.js';

export class App {
  page: Page;
  mainPage: MainPage;
  loginUser: LoginUser;
  templateList: TemplateList;
  createTask: CreateTask;


  constructor(page: Page) {
    this.page = page;
    this.mainPage = new MainPage(page);
    this.loginUser = new LoginUser(page);
    this.templateList = new TemplateList(page);
    this.createTask = new CreateTask(page);
  }
}