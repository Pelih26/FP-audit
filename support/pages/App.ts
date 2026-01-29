import { Page } from '@playwright/test';
import { MainPage, LoginUser, TemplateList } from './index.js';

export class App {
  page: Page;
  mainPage: MainPage;
  loginUser: LoginUser;
  templateList: TemplateList;

  constructor(page: Page) {
    this.page = page;
    this.mainPage = new MainPage(page);
    this.loginUser = new LoginUser(page);
    this.templateList = new TemplateList(page);
  }
}