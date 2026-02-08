import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { RegisterModal } from '../pages/components/registerModal';


const generateIdSuffix = () => {
    const ts = Date.now().toString(36);
    const rnd = Math.random().toString(36).slice(2, 8);
    return `${ts}${rnd}`;
};

const buildRandomName = (suffix: string) => {
    const letters = (suffix + "abcde").replace(/[^a-zA-Z]/g, "");
    const padded = letters.padEnd(5, "a").slice(0, 10);
    return padded.charAt(0).toUpperCase() + padded.slice(1);
};

test.describe('Register - Regression Tests (POM) @regression @register', () => {
    let landingPage: LandingPage;
    let registerModal: RegisterModal;

    test.beforeEach(async ({ page }) => {
        landingPage = new LandingPage(page);
        registerModal = new RegisterModal(page);

        await landingPage.navigate();
        await landingPage.openRegisterModal();
    });

    // --- ТЕСТ 1: Невалиден имейл ---
    test('Should show error for invalid email format', async () => {

        await registerModal.emailInput.fill('invalid-email-format');
        await registerModal.passwordInput.click();

        await expect(registerModal.emailError).toBeVisible({ timeout: 5000 });
    });

    // --- ТЕСТ 2: Невалидна дата на раждане (1900) ---
    test('Should show error for invalid Date of Birth (Year 1900)', async () => {
        await registerModal.dobDayInput.fill('01');
        await registerModal.dobMonthInput.fill('01');
        await registerModal.dobYearInput.fill('1900');
        
        await registerModal.emailInput.click(); 

        await expect(registerModal.dobError).toBeVisible();
    });

    // --- ТЕСТ 3: Твърде къса парола ---
    test('Should show error for short password', async () => {
        await registerModal.passwordInput.fill('123');
        await registerModal.emailInput.click(); 

        await expect(registerModal.passwordError).toBeVisible();
    });

    // --- ТЕСТ 4: Град с цифри ---
    test('Should show error when City contains numbers', async () => {
        const suffix = generateIdSuffix();
        
        await registerModal.fillForm({
            email: `test+${suffix}@test.com`,
            password: 'Password01!',
            username: `user_${suffix}`.slice(0, 15),
            firstName: buildRandomName(suffix),
            lastName: buildRandomName(suffix),
            phone: `5${Math.floor(1000000000 + Math.random() * 9000000000)}`,
            dobDay: '01',
            dobMonth: '01',
            dobYear: '1990',
            address: 'Test Address',
            city: 'Istanbul123', // <--- ЕТО ГРЕШНИЯТ ГРАД
            zip: '34000'
        });
        
        await registerModal.zipInput.click(); 

        await expect(registerModal.cityError).toBeVisible();
    });

    // --- ТЕСТ 5: Дублиран Username ---
    test('Should fail on Submit when username is already taken', async () => {
        const suffix = generateIdSuffix();
        const existingUser = 'zhulien_sadqwe2'; 

        
        await registerModal.fillForm({
            email: `test+${suffix}@test.com`,
            password: 'Password01!',
            username: existingUser,
            firstName: buildRandomName(suffix),
            lastName: buildRandomName(suffix),
            phone: `5${Math.floor(1000000000 + Math.random() * 9000000000)}`,
            dobDay: '01',
            dobMonth: '01',
            dobYear: '1990',
            address: 'Test Address',
            city: 'Istanbul',
            zip: '34000'
        });

        
        await registerModal.submit();

      
        await expect(registerModal.usernameError).toBeVisible({ timeout: 10000 });
    });
});