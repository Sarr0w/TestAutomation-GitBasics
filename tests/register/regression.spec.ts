import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { RegisterModal } from '../pages/components/registerModal';


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
        
        // Кликаме друго поле, за да се махне фокусът (blur) и да излезе грешката
        await registerModal.passwordInput.click();

        await expect(registerModal.emailError).toBeVisible({ timeout: 5000 });
    });

    // --- ТЕСТ 2: Невалидна дата на раждане (1900) ---
    test('Should show error for invalid Date of Birth (Year 1900)', async () => {
        await registerModal.dobDayInput.fill('01');
        await registerModal.dobMonthInput.fill('01');
        await registerModal.dobYearInput.fill('1900');
        
        await registerModal.emailInput.click(); // Blur trigger

        await expect(registerModal.dobError).toBeVisible();
    });

    // --- ТЕСТ 3: Твърде къса парола ---
    test('Should show error for short password', async () => {
        await registerModal.passwordInput.fill('123');
        await registerModal.emailInput.click(); // Blur trigger

        await expect(registerModal.passwordError).toBeVisible();
    });

    // --- ТЕСТ 4: Град с цифри ---
    test('Should show error when City contains numbers', async () => {
        // 1. Взимаме валидни данни от POM-а
        const userData = registerModal.generateRandomUserData();
        
        // 2. Чупим само града нарочно
        userData.city = 'Istanbul123';

        // 3. Попълваме формата (fillForm вече работи коректно)
        await registerModal.fillForm(userData);
        
        

        await expect(registerModal.cityError).toBeVisible();
    });

    // --- ТЕСТ 5: Дублиран Username ---
    test('Should fail on Submit when username is already taken', async () => {
        // 1. Взимаме валидни данни
        const userData = registerModal.generateRandomUserData();
        
        // 2. Слагаме съществуващ потребител (увери се, че този user го има в системата!)
        userData.username = 'zhulien_sadqwe2'; 

        // 3. Попълваме и изпращаме
        await registerModal.fillForm(userData);
        await registerModal.submit();

        // 4. Очакваме грешка
        await expect(registerModal.usernameError).toBeVisible({ timeout: 10000 });
    });
});