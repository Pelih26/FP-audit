import { Page } from '@playwright/test';
import { SideBarMenuPage, LoginPage, TemplateList, CreateTask } from './index.js';

export class App {
  page: Page;
  sideBarMenuPage: SideBarMenuPage;
  loginPage: LoginPage;
  templateList: TemplateList;
  createTask: CreateTask;


  constructor(page: Page) {
    this.page = page;
    this.sideBarMenuPage = new SideBarMenuPage(page);
    this.loginPage = new LoginPage(page);
    this.templateList = new TemplateList(page);
    this.createTask = new CreateTask(page);
  }
}