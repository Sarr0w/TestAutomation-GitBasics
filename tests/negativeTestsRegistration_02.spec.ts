import { test, expect } from '@playwright/test';
test('invalidDateOfBirth', async ({ page }) => {
  await page.goto('https://kazancasino-stage.fsclub.tech/');  // 6018ms

    const registerButton = page.locator('.register-button-holder #buttonHeaderRegister');
    const iframe = page.frameLocator('iframe#newRegistrationIframe');
    const emailFieldInput = iframe.getByTestId('email');
    const passwordFieldInput = iframe.getByTestId('password');
    const userNameFieldInput = iframe.getByTestId('userName');
    const firstNameFieldInput = iframe.getByTestId('firstName');
    const lastNameFieldInput = iframe.getByTestId('lastName');
    const dateOfBirthMonth = iframe.getByTestId('dateOfBirth-MM');
    const dateOfBirthDay = iframe.getByTestId('dateOfBirth-DD');
    const dateOfBirthYear = iframe.getByTestId('dateOfBirth-YYYY');


await registerButton.click(); // 1853ms
await emailFieldInput.fill('qweqweqwqweeqwe123523@venturesrab.io');
await passwordFieldInput.fill('Password01!');
await userNameFieldInput.fill('zhulien_sadqwe2');
await firstNameFieldInput.fill('Zhulien');
await lastNameFieldInput.fill('Zhelyazkovoto');
await dateOfBirthMonth.fill('01');
await dateOfBirthDay.fill('01');
await dateOfBirthYear.fill('1900');

const dateOfBirthErrorMessage = iframe.getByTestId('input-dateOfBirth-error');
await expect(dateOfBirthErrorMessage).toBeVisible({ timeout: 15000 });
});

