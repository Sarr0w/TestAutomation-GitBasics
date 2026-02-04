import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

  
    readonly userMenuButton: Locator = this.page.getByTestId('loggedUserName');
    readonly homePageButton: Locator = this.page.getByTestId('home-button');
    readonly logoutButton: Locator = this.page.getByTestId('logout');

   
    async verifyUserIsLoggedIn() {
        await expect(this.userMenuButton).toBeVisible({ timeout: 15000 });
    }

   
    async logout() {
        await this.userMenuButton.click(); 
        await this.logoutButton.click();  

       
        await expect(this.page.locator('.user-login-button #buttonHeaderLogin')).toBeVisible();
    }
}