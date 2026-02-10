import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { LoginModal } from '../pages/components/loginModal';
import { HomePage } from '../pages/homePage';

const VALID_USER = {
    username: 'zhulien_try',
    password: 'Password01!'
};

test.describe('Login - Regression Tests', () => {
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
        
        await expect(loginModal.errorAlert, 'Error alert should be visible when password is incorrect').toBeVisible();
    });

    // --- ТЕСТ 2: Несъществуващ потребител ---
    test('Should show error for non-existent user', async () => {
        const randomUser = `non_exist_${Date.now()}`;
        
        await loginModal.login(randomUser, 'Password01!');
        await expect(loginModal.errorAlert, 'Error alert should be visible for non-existent user').toBeVisible();
    });

    // --- ТЕСТ 3: Празен Username ---
    test('Login button should be DISABLED when username is empty', async () => {
        await loginModal.passwordInput.fill('SomePassword123');
    
    
        await expect(loginModal.submitButton, 'Login button should be disabled when username is empty').toBeDisabled();
    });

    // --- ТЕСТ 4: Празна Password ---
    test('Login button should be DISABLED when password is empty', async () => {
        await loginModal.usernameInput.fill('SomeUser');
       
   
        await expect(loginModal.submitButton, 'Login button should be disabled when password is empty').toBeDisabled();
    });


    test('Should fail login with special characters', async () => {
        const sqlInjection = "' OR 1=1 --";
        
        await loginModal.login(sqlInjection, sqlInjection);
     
        await expect(loginModal.errorAlert, 'Error alert should be visible for SQL injection attempt').toBeVisible();
        await expect(homePage.userMenuButton, 'User should NOT be logged in with SQL injection credentials').not.toBeVisible();
    });
});