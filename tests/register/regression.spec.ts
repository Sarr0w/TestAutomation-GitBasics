import { test, expect } from '@playwright/test';

const generateIdSuffix = () => {
    const ts = Date.now().toString(36);
    const rnd = Math.random().toString(36).slice(2, 8);
    return `${ts}${rnd}`;
};

const buildRandomUsername = (suffix: string) => `user_${suffix}`;

const buildRandomName = (suffix: string, minLength = 5, maxLength = 15) => {
    const entropy = Math.random().toString(36).replace(/[^a-zA-Z]/g, "");
    const letters = (suffix + entropy).replace(/[^a-zA-Z]/g, "");
    const padded = letters.padEnd(minLength, "a");
    const trimmed = padded.slice(0, maxLength);
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

test.describe('Register - Regression Tests @regression', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://kazancasino-stage.fsclub.tech/');
        const registerButton = page.locator('.register-button-holder #buttonHeaderRegister');
        await registerButton.click();
    });

    // --- ТЕСТ 1: Невалиден имейл ---
    test('Should show error for invalid email format', async ({ page }) => {
        const iframe = page.frameLocator('iframe#newRegistrationIframe');
        
 
        await iframe.getByTestId('email').fill('invalid-email-format');
        
    
        await iframe.getByTestId('password').click();

        
        const emailError = iframe.getByTestId('input-email-error'); 
        await expect(emailError).toBeVisible({ timeout: 5000 });
    });

    // ---  ТЕСТ 2: Невалидна дата на раждане ---
    test('Should show error for invalid Date of Birth (Year 1900)', async ({ page }) => {
        const iframe = page.frameLocator('iframe#newRegistrationIframe');
        const suffix = generateIdSuffix();

       
        await iframe.getByTestId('email').fill(`test+${suffix}@test.com`);
        await iframe.getByTestId('password').fill('Password01!');
        await iframe.getByTestId('userName').fill(buildRandomUsername(suffix).slice(0, 15));
        await iframe.getByTestId('firstName').fill(buildRandomName(suffix));
        await iframe.getByTestId('lastName').fill(buildRandomName(suffix));
   
        
    
        await iframe.getByTestId('dateOfBirth-MM').fill('01');
        await iframe.getByTestId('dateOfBirth-DD').fill('01');
        await iframe.getByTestId('dateOfBirth-YYYY').fill('1900'); 


        // 3. Проверяваме за грешката
        const dobError = iframe.getByTestId('input-dateOfBirth-error'); 
        await expect(dobError).toBeVisible();
    });

    // --- ТЕСТ 3: Твърде къса парола ---
    test('Should show error for short password', async ({ page }) => {
        const iframe = page.frameLocator('iframe#newRegistrationIframe');
        
        await iframe.getByTestId('password').fill('123'); 
        await iframe.getByTestId('email').click()

       
        const passwordError = iframe.getByTestId('input-password-error'); 
       
        await expect(passwordError).toBeVisible();
    });
  // --- ТЕСТ 3: Валидация при град; Не може да съдържа цифри---
    test('Should show error when City contains numbers', async ({ page }) => {
        const iframe = page.frameLocator('iframe#newRegistrationIframe');
        const suffix = generateIdSuffix();

      
        await iframe.getByTestId('email').fill(`test+${suffix}@test.com`);
        await iframe.getByTestId('password').fill('Password01!');
        
 
        await iframe.getByTestId('userName').fill(buildRandomUsername(suffix).slice(0, 15));
        
        await iframe.getByTestId('firstName').fill(buildRandomName(suffix));
        await iframe.getByTestId('lastName').fill(buildRandomName(suffix));
        
   
   
        
        await iframe.getByTestId('dateOfBirth-MM').fill('01');
        await iframe.getByTestId('dateOfBirth-DD').fill('01');
        await iframe.getByTestId('dateOfBirth-YYYY').fill('1990');
        await iframe.getByTestId('address').fill('Test Address');
        await iframe.getByTestId('zipCode').fill('34000');

 
    await iframe.getByTestId('city').fill('Istanbul123'); 
    const cityError = iframe.getByTestId('input-city-error');
    
    await expect(cityError).toBeVisible();
});

  // --- ТЕСТ 5: Дублиран Username (Грешка след Submit) ---
    test('Should fail on Submit when username is already taken', async ({ page }) => {
        const iframe = page.frameLocator('iframe#newRegistrationIframe');
        const suffix = generateIdSuffix();
        const existingUser = 'zhulien_sadqwe2'; 

     
        await iframe.getByTestId('email').fill(`test+${suffix}@test.com`);
        await iframe.getByTestId('password').fill('Password01!');

        await iframe.getByTestId('userName').fill(existingUser);
        await iframe.getByTestId('firstName').fill(buildRandomName(suffix));
        await iframe.getByTestId('lastName').fill(buildRandomName(suffix));
        
        
        await iframe.getByTestId('dateOfBirth-MM').fill('01');
        await iframe.getByTestId('dateOfBirth-DD').fill('01');
        await iframe.getByTestId('dateOfBirth-YYYY').fill('1990');

        await iframe.getByTestId('address').fill('Test Address');
        await iframe.getByTestId('city').fill('Istanbul');
        await iframe.getByTestId('zipCode').fill('34000');
        await iframe.getByTestId('phone').fill(`5${Math.floor(1000000000 + Math.random() * 9000000000)}`);
        
        await iframe.getByTestId('acceptTermsAndConditions').check();
        await iframe.getByTestId('acceptAttestation').check();
        await iframe.getByTestId('notifyForPromotionsAndBonuses').check();

       
        const submitBtn = iframe.getByTestId('registration-submit-button');
        await submitBtn.click();

    
        const userError = iframe.getByTestId('input-userName-error');
        
       
            await expect(userError).toBeVisible({ timeout: 10000 });
        });
    });