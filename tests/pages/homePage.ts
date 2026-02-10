import { Locator, Page } from '@playwright/test'; // Махаме expect от импорта
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

  
    readonly userMenuButton: Locator = this.page.getByTestId('loggedUserName');
    readonly homePageButton: Locator = this.page.getByTestId('home-button');
    readonly logoutButton: Locator = this.page.getByTestId('logout');
    readonly loginHeaderButton: Locator = this.page.locator('.user-login-button #buttonHeaderLogin');


    async logout() {
        await this.userMenuButton.click(); 
        await this.logoutButton.click();  
  
    }
}