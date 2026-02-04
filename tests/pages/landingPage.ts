import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LandingPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

   
    readonly loginHeaderButton: Locator = this.page.locator('.user-login-button #buttonHeaderLogin');
    readonly registerHeaderButton: Locator = this.page.locator('.register-button-holder #buttonHeaderRegister');


    async openLoginModal() {
        await this.loginHeaderButton.click();
    }

    async openRegisterModal() {
        await this.registerHeaderButton.click();
    }
}