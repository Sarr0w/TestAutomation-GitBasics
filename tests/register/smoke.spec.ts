import { test, expect } from '@playwright/test';

// --- ХЕЛПЪР ФУНКЦИИ ---
const generateIdSuffix = () => {
    const ts = Date.now().toString(36);
    const rnd = Math.random().toString(36).slice(2, 8);
    return `${ts}${rnd}`;
};

const buildRandomUsername = (suffix: string) => `user_${suffix}`;

const buildRandomName = (suffix: string, minLength = 5, maxLength = 15) => {
    const entropy = Math.random().toString(36).replace(/[^a-zA-Z]/g, "");
    const letters = (suffix + entropy).replace(/[^a-zA-Z]/g, "");
    const padded = letters.padEnd(minLength, "a");
    const trimmed = padded.slice(0, maxLength);
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

// --- НАЧАЛО НА DESCRIBE БЛОКА ---
// Всички тестове за този файл влизат тук
test.describe('Register - Smoke Tests @smoke', () => {

    // Това се изпълнява преди ВСЕКИ тест в този describe блок
    test.beforeEach(async ({ page }) => {
        await page.goto('https://kazancasino-stage.fsclub.tech/');
        const registerButton = page.locator('.register-button-holder #buttonHeaderRegister');
        await registerButton.click();
    });

    // --- ТЕСТ 1: Успешна регистрация (Твоят код) ---
    test('Successful registration with random suffix data', async ({ page }) => {
        const iframe = page.frameLocator('iframe#newRegistrationIframe');
        
        const suffix = generateIdSuffix();
        const data = {
            email: `test+${suffix}@venturesrab.io`,
            username: buildRandomUsername(suffix).slice(0, 15),
            firstName: buildRandomName(suffix),
            lastName: buildRandomName(suffix),
            address: `St. Random ${suffix.toUpperCase()}`, 
            city: 'Istanbul',
            zip: '34000',
            phone: `5${Math.floor(1000000000 + Math.random() * 9000000000)}` 
        };

        const emailFieldInput = iframe.getByTestId('email');
        const passwordFieldInput = iframe.getByTestId('password');
        const userNameFieldInput = iframe.getByTestId('userName');
        const firstNameFieldInput = iframe.getByTestId('firstName');
        const lastNameFieldInput = iframe.getByTestId('lastName');
        const addressFieldInput = iframe.getByTestId('address');
        const phoneFieldInput = iframe.getByTestId('phone');

        await emailFieldInput.fill(data.email);
        await passwordFieldInput.fill('Password01!');
        await userNameFieldInput.fill(data.username);
        await firstNameFieldInput.fill(data.firstName);
        await lastNameFieldInput.fill(data.lastName);
        
        await iframe.getByTestId('dateOfBirth-MM').fill('01');
        await iframe.getByTestId('dateOfBirth-DD').fill('01');
        await iframe.getByTestId('dateOfBirth-YYYY').fill('1990');
        
        await addressFieldInput.fill(data.address);
        await iframe.getByTestId('city').fill(data.city);
        await iframe.getByTestId('zipCode').fill(data.zip);
        await phoneFieldInput.fill(data.phone);

        await iframe.getByTestId('acceptTermsAndConditions').check();
        await iframe.getByTestId('acceptAttestation').check();
        await iframe.getByTestId('notifyForPromotionsAndBonuses').check();

        await iframe.getByTestId('registration-submit-button').click();

        const playButton = iframe.getByTestId('play-button');
        await expect(playButton).toBeVisible({ timeout: 15000 });
        
        console.log(`✅ Smoke 1 Passed: ${data.username}`);
    });

    // --- ТЕСТ 2: Проверка на UI (Вторият задължителен тест) ---
    test('Verify registration form UI elements are visible', async ({ page }) => {
        const iframe = page.frameLocator('iframe#newRegistrationIframe');

        // Тук просто проверяваме дали полетата са там, без да ги попълваме
        // Тъй като сме в същия describe, beforeEach вече е отворил формата за нас!
        
        await expect(iframe.getByTestId('email'), 'Email field missing').toBeVisible();
        await expect(iframe.getByTestId('password'), 'Password field missing').toBeVisible();
        await expect(iframe.getByTestId('userName'), 'Username field missing').toBeVisible();
        await expect(iframe.getByTestId('registration-submit-button'), 'Submit btn missing').toBeVisible();
        
        console.log('✅ Smoke 2 Passed: UI elements visible');
    });

});