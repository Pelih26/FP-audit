import { Page } from '@playwright/test';
import { SideBarMenuPage, LoginPage, TemplateWizardPage, TasksAllPage } from './index.js';

export class App {
  page: Page;
  sideBarMenuPage: SideBarMenuPage;
  loginPage: LoginPage;
  templateWizardPage: TemplateWizardPage;
  tasksAllPage: TasksAllPage;


  constructor(page: Page) {
    this.page = page;
    this.sideBarMenuPage = new SideBarMenuPage(page);
    this.loginPage = new LoginPage(page);
    this.templateWizardPage = new TemplateWizardPage(page);
    this.tasksAllPage = new TasksAllPage(page);
  }
}