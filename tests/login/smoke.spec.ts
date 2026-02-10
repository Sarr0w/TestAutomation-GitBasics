import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { LoginModal } from '../pages/components/loginModal';
import { HomePage } from '../pages/homePage';

const VALID_USER = {
    username: 'zhulien_try',
    password: 'Password01'
};

test.describe('Login - Smoke Tests (POM) @smoke @login', () => {
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

    // --- ТЕСТ 1: Проверка на UI елементите ---
    test('Verify login form UI elements are visible', async () => {
        await expect(loginModal.usernameInput, 'Username input field should be visible').toBeVisible();
        await expect(loginModal.passwordInput, 'Password input field should be visible').toBeVisible();
        await expect(loginModal.submitButton, 'Login submit button should be visible').toBeVisible();
    });

    // --- ТЕСТ 2: Успешно логване и излизане ---
    test('Successful login and logout', async () => {
        await loginModal.login(VALID_USER.username, VALID_USER.password);

        await expect(homePage.userMenuButton, 'User Menu button should be visible after successful login').toBeVisible();
        
        await homePage.logout();

        await expect(landingPage.loginHeaderButton, 'Login/Register header buttons should be visible after logout').toBeVisible(); 
    });
});