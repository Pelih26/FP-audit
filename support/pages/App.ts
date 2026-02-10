import { Page } from '@playwright/test';
import { MainPage, LoginPage, TemplateList, CreateTask } from './index.js';

export class App {
  page: Page;
  mainPage: MainPage;
  loginPage: LoginPage;
  templateList: TemplateList;
  createTask: CreateTask;


  constructor(page: Page) {
    this.page = page;
    this.mainPage = new MainPage(page);
    this.loginPage = new LoginPage(page);
    this.templateList = new TemplateList(page);
    this.createTask = new CreateTask(page);
  }
}