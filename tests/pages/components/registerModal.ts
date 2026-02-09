import { FrameLocator, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

// 1. Дефинираме типа на данните, за да ни помага VS Code
export interface UserData {
    email?: string;
    password?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    dobDay?: string;
    dobMonth?: string;
    dobYear?: string;
    address?: string;
    city?: string;
    zip?: string;
}

export class RegisterModal extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    readonly iframe: FrameLocator = this.page.frameLocator('iframe#newRegistrationIframe');
    
    // --- LOCATORS ---
    readonly successButton: Locator = this.iframe.getByTestId('play-button');
    readonly submitButton: Locator = this.iframe.getByTestId('registration-submit-button');

    // Inputs
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

    // Checkboxes
    readonly termsCheckbox: Locator = this.iframe.getByTestId('acceptTermsAndConditions');
    readonly ageCheckbox: Locator = this.iframe.getByTestId('acceptAttestation');
    readonly promoCheckbox: Locator = this.iframe.getByTestId('notifyForPromotionsAndBonuses');

    // Errors
    readonly emailError: Locator = this.iframe.getByTestId('input-email-error');
    readonly passwordError: Locator = this.iframe.getByTestId('input-password-error');
    readonly usernameError: Locator = this.iframe.getByTestId('input-userName-error');
    readonly dobError: Locator = this.iframe.getByTestId('input-dateOfBirth-error');
    readonly cityError: Locator = this.iframe.getByTestId('input-city-error');


    // --- DATA GENERATION ---
    
    private generateIdSuffix(): string {
        const ts = Date.now().toString(36);
        const rnd = Math.random().toString(36).slice(2, 8);
        return `${ts}${rnd}`;
    }

    private buildRandomName(suffix: string): string {
        const letters = (suffix + "abcde").replace(/[^a-zA-Z]/g, "");
        const padded = letters.padEnd(5, "a").slice(0, 10);
        return padded.charAt(0).toUpperCase() + padded.slice(1);
    }

    // Публичен метод за генериране на валиден потребител
    generateRandomUserData(): UserData {
        const suffix = this.generateIdSuffix();
        return {
            email: `test+${suffix}@test.com`,
            password: 'Password01!',
            username: `user_${suffix}`.slice(0, 15),
            firstName: this.buildRandomName(suffix),
            lastName: this.buildRandomName(suffix),
            phone: `5${Math.floor(1000000000 + Math.random() * 9000000000)}`,
            dobDay: '01',
            dobMonth: '01',
            dobYear: '1990',
            address: 'Test Street 1',
            city: 'Sofia',
            zip: '1000'
        };
    }

    // --- ACTIONS ---

    // 2. Partial<UserData> позволява да подадем само част от полетата (напр. само email)
    async fillForm(userData: Partial<UserData>) {
        if (userData.email) await this.emailInput.fill(userData.email);
        if (userData.password) await this.passwordInput.fill(userData.password);
        if (userData.username) await this.usernameInput.fill(userData.username);
        if (userData.firstName) await this.firstNameInput.fill(userData.firstName);
        if (userData.lastName) await this.lastNameInput.fill(userData.lastName);
        
        if (userData.dobDay) await this.dobDayInput.fill(userData.dobDay);
        if (userData.dobMonth) await this.dobMonthInput.fill(userData.dobMonth);
        if (userData.dobYear) await this.dobYearInput.fill(userData.dobYear);
        
        if (userData.phone) await this.phoneInput.fill(userData.phone);
        
        if (userData.address) await this.addressInput.fill(userData.address);
        if (userData.city) await this.cityInput.fill(userData.city);
        if (userData.zip) await this.zipInput.fill(userData.zip);

        // Чекбоксовете ги маркираме винаги, за да можем да стигнем до Submit бутона
        await this.termsCheckbox.check();
        await this.ageCheckbox.check();
        await this.promoCheckbox.check();
    }

    async submit() {
        await this.submitButton.click();
    }

    async closeSuccessModal() {
        await this.successButton.click({ force: true });
    }
}