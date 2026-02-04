import { expect, FrameLocator, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class RegisterModal extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    readonly iframe: FrameLocator = this.page.frameLocator('iframe#newRegistrationIframe');
    readonly successButton: Locator = this.iframe.getByTestId('play-button');

   
    readonly emailInput: Locator = this.iframe.getByTestId('email');
    readonly passwordInput: Locator = this.iframe.getByTestId('password');
    readonly usernameInput: Locator = this.iframe.getByTestId('userName');
    readonly firstNameInput: Locator = this.iframe.getByTestId('firstName');
    readonly lastNameInput: Locator = this.iframe.getByTestId('lastName');
    readonly phoneInput: Locator = this.iframe.getByTestId('phone');

  
    readonly dobDayInput: Locator = this.iframe.getByTestId('dateOfBirth-DD');
    readonly dobMonthInput: Locator = this.iframe.getByTestId('dateOfBirth-MM');
    readonly dobYearInput: Locator = this.iframe.getByTestId('dateOfBirth-YYYY');

  
    readonly addressInput: Locator = this.iframe.getByTestId('address');
    readonly cityInput: Locator = this.iframe.getByTestId('city');
    readonly zipInput: Locator = this.iframe.getByTestId('zipCode');

    
    readonly termsCheckbox: Locator = this.iframe.getByTestId('acceptTermsAndConditions');
    readonly ageCheckbox: Locator = this.iframe.getByTestId('acceptAttestation');
    readonly promoCheckbox: Locator = this.iframe.getByTestId('notifyForPromotionsAndBonuses');
    readonly submitButton: Locator = this.iframe.getByTestId('registration-submit-button');

   
    readonly emailError: Locator = this.iframe.getByTestId('input-email-error');
    readonly passwordError: Locator = this.iframe.getByTestId('input-password-error');
    readonly usernameError: Locator = this.iframe.getByTestId('input-userName-error');
    readonly dobError: Locator = this.iframe.getByTestId('input-dateOfBirth-error');
    readonly cityError: Locator = this.iframe.getByTestId('input-city-error');


    async fillForm(userData: any) {
        await this.emailInput.fill(userData.email);
        await this.passwordInput.fill(userData.password);
        await this.usernameInput.fill(userData.username);
        await this.firstNameInput.fill(userData.firstName);
        await this.lastNameInput.fill(userData.lastName);

        await this.dobDayInput.fill(userData.dobDay);
        await this.dobMonthInput.fill(userData.dobMonth);
        await this.dobYearInput.fill(userData.dobYear);

        await this.phoneInput.fill(userData.phone);

        await this.addressInput.fill(userData.address);
        await this.cityInput.fill(userData.city);
        await this.zipInput.fill(userData.zip);

        await this.termsCheckbox.check();
        await this.ageCheckbox.check();
        await this.promoCheckbox.check();
    }

    async submit() {
        await this.submitButton.click();
    }

    async closeSuccessModal() {
        await expect(this.successButton).toBeVisible({ timeout: 15000 });
        await this.successButton.click();
    }
}