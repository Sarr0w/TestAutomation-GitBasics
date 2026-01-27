import { test, expect } from '@playwright/test';
test('wrongUsername', async ({ page }) => {

  await page.goto('https://kazancasino-stage.fsclub.tech/'); // 6018ms

  const loginButton = page.locator('.user-login-button #buttonHeaderLogin');
  const iframe = page.frameLocator('#newLoginIframe');

  const userNameFieldInput = iframe.getByTestId('userName');
  const passwordFieldInput = iframe.getByTestId('password');
  const submitButton = iframe.getByTestId('login-submit-button');

  await loginButton.click(); // ⏳ waiting...

  await userNameFieldInput.fill('zhulien_try2222');
  await passwordFieldInput.fill('Password01');

  await submitButton.click();

  const alertMessage = iframe.getByTestId('alert-icon');

  await expect(alertMessage).toBeVisible({ timeout: 15000 });
});