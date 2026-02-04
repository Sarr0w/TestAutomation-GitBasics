import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { LoginModal } from '../pages/components/loginModal';
import { HomePage } from '../pages/homePage';


const VALID_USER = {
    username: 'zhulien_try',
    password: 'Password01!'
};

test.describe('Login - Regression Tests (POM) @regression @login', () => {
    let landingPage: LandingPage;
    let loginModal: LoginModal;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        landingPage = new LandingPage(page);
        loginModal = new LoginModal(page);
        homePage = new HomePage(page);

        
        await landingPage.navigate();
        await landingPage.openLoginModal();
    });

    // --- ТЕСТ 1: Грешна парола ---
    test('Should show error for invalid password', async () => {
        await loginModal.login(VALID_USER.username, 'WrongPass123!');
        
        await expect(loginModal.errorAlert).toBeVisible();
    });

    // --- ТЕСТ 2: Несъществуващ потребител ---
    test('Should show error for non-existent user', async () => {
        const randomUser = `non_exist_${Date.now()}`;
        
        await loginModal.login(randomUser, 'Password01!');
        await expect(loginModal.errorAlert).toBeVisible();
    });

    // --- ТЕСТ 3: Празно поле Username ---
    test('Should validate empty username field', async () => {
        // Попълваме само парола
        await loginModal.passwordInput.fill(VALID_USER.password);
        await loginModal.submitButton.click();

        await expect(loginModal.usernameError).toBeVisible();
    });

    // --- ТЕСТ 4: Празно поле Password ---
    test('Should validate empty password field', async () => {
   
        await loginModal.usernameInput.fill(VALID_USER.username);
        await loginModal.submitButton.click();


        await expect(loginModal.passwordError).toBeVisible();
    });

    // --- ТЕСТ 5: Login with special characters ---
    test('Should fail login with special characters', async () => {
        const sqlInjection = "' OR 1=1 --";
        
       
        await loginModal.login(sqlInjection, sqlInjection);
     
        await expect(loginModal.errorAlert).toBeVisible();
        await expect(homePage.userMenuButton).not.toBeVisible();
    });
});