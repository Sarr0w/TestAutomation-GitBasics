import { test, expect } from '@playwright/test';


const validUser ={
    username: 'zhulien_try', 
    password: 'Password01'
};

test.describe('Login - Smoke Tests @smoke @login', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://kazancasino-stage.fsclub.tech/');
        
        
        const loginButton = page.locator('.user-login-button #buttonHeaderLogin');
        await loginButton.click();
    });

    // --- ТЕСТ 1: Успешен вход  ---
    test('Successful login with valid credentials', async ({ page }) => {
     
        const iframe = page.frameLocator('#newLoginIframe');

        const usernameField = iframe.getByTestId('userName');
        const passwordField = iframe.getByTestId('password');
        const submitButton = iframe.getByTestId('login-submit-button');

     
        await usernameField.fill(validUser.username);
        await passwordField.fill(validUser.password);

       
        await submitButton.click();

    
        const loggedUserIcon = page.getByTestId('loggedUserName'); //
        
        await expect(loggedUserIcon, 'User should be logged in successfully').toBeVisible({ timeout: 15000 });
    });

    // --- ТЕСТ 2: Проверка на UI елементи (Вторият задължителен Smoke тест) ---
    test('Verify login form UI elements are visible', async ({ page }) => {
        const iframe = page.frameLocator('#newLoginIframe');

        
        await expect(iframe.getByTestId('userName'), 'Username field is missing').toBeVisible();
        await expect(iframe.getByTestId('password'), 'Password field is missing').toBeVisible();
        await expect(iframe.getByTestId('login-submit-button'), 'Submit button is missing').toBeVisible();
    });

});