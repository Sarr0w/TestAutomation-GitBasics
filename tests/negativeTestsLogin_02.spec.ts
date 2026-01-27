import { test, expect } from '@playwright/test';
test('emptyPasswordField', async ({ page }) => {

  await page.goto('https://kazancasino-stage.fsclub.tech/'); // 6018ms

  const loginButton = page.locator('.user-login-button #buttonHeaderLogin');
  const iframe = page.frameLocator('#newLoginIframe');

  const userNameFieldInput = iframe.getByTestId('userName');
  const passwordFieldInput = iframe.getByTestId('password');
  const submitButton = iframe.getByTestId('login-submit-button');

  await loginButton.click(); // ⏳ waiting...

  await userNameFieldInput.fill('zhulien_try2222');
  await passwordFieldInput.fill('');

  await submitButton.click();

  const emptyPasswordFieldError = iframe.getByTestId('input-password-error');

  await expect(emptyPasswordFieldError).toBeVisible({ timeout: 15000 });
});