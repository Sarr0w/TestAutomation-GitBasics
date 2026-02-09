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

  test('Login button should be DISABLED when username is empty', async () => {
      
        await loginModal.passwordInput.fill('SomePassword123');
        
        await loginModal.usernameInput.fill('');
    
        await expect(loginModal.submitButton).toBeDisabled();
    });

    // --- ТЕСТ 3: Празно Password (Нова логика) ---
    test('Login button should be DISABLED when password is empty', async () => {

        await loginModal.usernameInput.fill('SomeUser');
        
        await loginModal.passwordInput.fill('');
   
        await expect(loginModal.submitButton).toBeDisabled();
    });

    // --- ТЕСТ 5: Login with special characters ---
    test('Should fail login with special characters', async () => {
        const sqlInjection = "' OR 1=1 --";
        
       
        await loginModal.login(sqlInjection, sqlInjection);
     
        await expect(loginModal.errorAlert).toBeVisible();
        await expect(homePage.userMenuButton).not.toBeVisible();
    });
});