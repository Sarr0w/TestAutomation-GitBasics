import { FrameLocator, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class LoginModal extends BasePage {

    constructor(page: Page) {
        super(page);
    }


    readonly iframe: FrameLocator = this.page.frameLocator('#newLoginIframe');

  
    readonly usernameInput: Locator = this.iframe.getByTestId('userName');
    readonly passwordInput: Locator = this.iframe.getByTestId('password');
    readonly submitButton: Locator = this.iframe.getByTestId('login-submit-button');

 
    readonly errorAlert: Locator = this.iframe.getByTestId('alert-icon'); 
    readonly usernameError: Locator = this.iframe.getByTestId('input-userName-error');
    readonly passwordError: Locator = this.iframe.getByTestId('input-password-error');


    async login(username: string, pass: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(pass);
        await this.submitButton.click();
    }
}