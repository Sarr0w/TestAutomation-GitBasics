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

    // --- ТЕСТ 2: Успешен вход и изход (Твоят оригинален Тест 1 + Logout) ---
    test('Successful login and logout', async () => {
   
        await loginModal.login(VALID_USER.username, VALID_USER.password);

     
        await homePage.verifyUserIsLoggedIn();
        
 
        await homePage.logout();
    });
});