import { test, expect } from '@playwright/test';


const validUser ={
    username: 'zhulien_try', 
    password: 'Password01!'
};

test.describe('Login - Regression Tests @regression @login', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://kazancasino-stage.fsclub.tech/');
        
      
        const loginButton = page.locator('.user-login-button #buttonHeaderLogin');
        await loginButton.click();
    });

    // --- ТЕСТ 1: Грешна парола ---
    test('Should show error for invalid password', async ({ page }) => {
        const iframe = page.frameLocator('#newLoginIframe');

      
        await iframe.getByTestId('userName').fill(validUser.username);
        await iframe.getByTestId('password').fill('WrongPass123!');
        
        await iframe.getByTestId('login-submit-button').click();

    
        const errorMsg = iframe.getByTestId('alert-icon')
        await expect(errorMsg).toBeVisible();
    });

    // --- ТЕСТ 2: Несъществуващ потребител ---
    test('Should show error for non-existent user', async ({ page }) => {
        const iframe = page.frameLocator('#newLoginIframe');
        const randomUser = `non_exist_${Date.now()}`;

        await iframe.getByTestId('userName').fill(randomUser);
        await iframe.getByTestId('password').fill('Password01!');
        
        await iframe.getByTestId('login-submit-button').click();

        const errorMsg = iframe.getByTestId('alert-icon');
        await expect(errorMsg).toBeVisible();
    });

    // --- ТЕСТ 3: Празно поле Username ---
    test('Should validate empty username field', async ({ page }) => {
        const iframe = page.frameLocator('#newLoginIframe');

  
        await iframe.getByTestId('password').fill(validUser.password);
        await iframe.getByTestId('login-submit-button').click();

        const userError = iframe.getByTestId('input-userName-error');
        await expect(userError).toBeVisible();
    });

    // --- ТЕСТ 4: Празно поле Password ---
    test('Should validate empty password field', async ({ page }) => {
        const iframe = page.frameLocator('#newLoginIframe');

  
        await iframe.getByTestId('userName').fill(validUser.username);
        await iframe.getByTestId('login-submit-button').click();


        const passError = iframe.getByTestId('input-password-error');
        await expect(passError).toBeVisible();
    });

    // --- ТЕСТ 5: Login with special characters ---
    test('Should fail login with special characters', async ({ page }) => {
        const iframe = page.frameLocator('#newLoginIframe');

        await iframe.getByTestId('userName').fill("' OR 1=1 --");
        await iframe.getByTestId('password').fill("' OR 1=1 --");
        
        await iframe.getByTestId('login-submit-button').click();

       

        const errorMsg = iframe.getByTestId('alert-icon');
        await expect(errorMsg).toBeVisible();
        await expect(page.getByTestId('loggedUserName')).not.toBeVisible();
    });

});