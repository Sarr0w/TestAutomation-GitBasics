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

    // --- ТЕСТ 1: Проверка на UI елементите (Твоят оригинален Тест 2) ---
    test('Verify login form UI elements are visible', async () => {
     
        await expect(loginModal.usernameInput, 'Username field is missing').toBeVisible();
        await expect(loginModal.passwordInput, 'Password field is missing').toBeVisible();
        await expect(loginModal.submitButton, 'Submit button is missing').toBeVisible();
    });

test('Successful login and logout', async ({ page }) => {
    // 1. Login Action
    await loginModal.login(VALID_USER.username, VALID_USER.password);

    // 2. ASSERTION: Тук проверяваме дали сме логнати
    // Вместо homePage.verifyUserIsLoggedIn(), пишем директно:
    await expect(homePage.userMenuButton).toBeVisible({ timeout: 30000 });
    
    // 3. Logout Action
    await homePage.logout();

    // 4. ASSERTION: Тук проверяваме дали сме излезли
    // Проверяваме дали бутонът за вход отново е видим
    // (За целта добавихме loginHeaderButton в HomePage.ts или ползваме LandingPage)
    await expect(landingPage.loginHeaderButton).toBeVisible(); 
});
});