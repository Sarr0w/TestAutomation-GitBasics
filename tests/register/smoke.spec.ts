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
        const userData = registerModal.generateRandomUserData();

        await registerModal.fillForm(userData);
        await registerModal.submit();
        await registerModal.closeSuccessModal();

        await expect(homePage.userMenuButton, 'User Menu button should be visible after successful registration').toBeVisible();
    });
});