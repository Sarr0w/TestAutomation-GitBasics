import { test, expect } from '@playwright/test';
test('login in kazancasino', async ({ page }) => {

  await page.goto('https://kazancasino-stage.fsclub.tech/'); // 6018ms

  const loginButton = page.locator('.user-login-button #buttonHeaderLogin');
  const iframe = page.frameLocator('#newLoginIframe');

  const userNameFieldInput = iframe.getByTestId('userName');
  const passwordFieldInput = iframe.getByTestId('password');
  const submitButton = iframe.getByTestId('login-submit-button');

  await loginButton.click(); // ⏳ waiting...

  await userNameFieldInput.fill('zhulien_try');
  await passwordFieldInput.fill('Password01');

  await submitButton.click();

  const loggedUserName = page.getByTestId('loggedUserName');

  await expect(loggedUserName, `The user is not logged in successfully`).toBeVisible({ timeout: 15000 });
});