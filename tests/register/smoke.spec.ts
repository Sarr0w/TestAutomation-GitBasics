import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { RegisterModal } from '../pages/components/registerModal';
import { HomePage } from '../pages/homePage';

test.describe('Register - Smoke Tests (POM) @smoke @register', () => {
    let landingPage: LandingPage;
    let registerModal: RegisterModal;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        landingPage = new LandingPage(page);
        registerModal = new RegisterModal(page);
        homePage = new HomePage(page);

        await landingPage.navigate();
        await landingPage.openRegisterModal();
    });

    test('Successful registration with auto-generated data', async () => {
        // 1. Взимаме валидни рандом данни от самия Page Object
        const userData = registerModal.generateRandomUserData();

        // 2. Попълваме формата с тях
        await registerModal.fillForm(userData);
        
        // 3. Изпращаме
        await registerModal.submit();

        // 4. Затваряме модала за успех (без 2FA драми)
        // Тук Playwright автоматично ще изчака бутона да се появи (auto-waiting)
        await registerModal.closeSuccessModal();

        // 5. Проверка: Логнати ли сме?
        await expect(homePage.userMenuButton).toBeVisible({ timeout: 30000 });
    });
});