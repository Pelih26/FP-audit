import { Page } from '@playwright/test';
import { MainPage, LoginUser, TemplateList} from './index';

export class App {
    readonly page: Page;
    readonly mainPage: MainPage;
    readonly loginUser: LoginUser;
    readonly templateList: TemplateList;

    constructor(page: Page) {
        this.page = page;
        this.mainPage = new MainPage(page);
        this.loginUser = new LoginUser(page);
        this.templateList = new TemplateList(page);
    }
}
