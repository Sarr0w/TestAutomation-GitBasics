import { test, expect } from '@playwright/test';
test('invalidEmailFormat', async ({ page }) => {
  await page.goto('https://kazancasino-stage.fsclub.tech/');  // 6018ms

    const registerButton = page.locator('.register-button-holder #buttonHeaderRegister');
    const iframe = page.frameLocator('iframe#newRegistrationIframe');
    const emailFieldInput = iframe.getByTestId('email');

    await registerButton.click(); // 1853ms
    await emailFieldInput.fill('invalid-email-format'); // Invalid email


const wrongEmailMessage = iframe.getByTestId('input-email-error');
await expect(wrongEmailMessage).toBeVisible({ timeout: 15000 });
});

