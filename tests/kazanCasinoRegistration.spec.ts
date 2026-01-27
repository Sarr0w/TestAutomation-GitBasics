import { test, expect } from '@playwright/test';
test('registration in kazancasino', async ({ page }) => {
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
    const addressFieldInput = iframe.getByTestId('address');
    const cityFieldInput = iframe.getByTestId('city');
    const postalCodeFieldInput = iframe.getByTestId('zipCode');
    const phoneFieldInput = iframe.getByTestId('phone');
    // const currencyDropdown = iframe.locator('select[name="currencyCode"]');

    const termsCheckbox = iframe.getByTestId('acceptTermsAndConditions');
    const attestationCheckbox = iframe.getByTestId('acceptAttestation');
    const notifyPromotionsCheckbox = iframe.getByTestId('notifyForPromotionsAndBonuses');

    const createAccountButton = iframe.getByTestId('registration-submit-button');

await registerButton.click(); // 1853ms
await emailFieldInput.fill('zhulien.zhelyazkov+123523@ventureslab.io');
await passwordFieldInput.fill('Password01!');
await userNameFieldInput.fill('zhulien_sadqwe2');
await firstNameFieldInput.fill('Zhulien');
await lastNameFieldInput.fill('Zhelyazkov');
await dateOfBirthMonth.fill('01');
await dateOfBirthDay.fill('01');
await dateOfBirthYear.fill('1990');
await addressFieldInput.fill('Some Address 123');
await cityFieldInput.fill('Some City');
await postalCodeFieldInput.fill('12345');
await phoneFieldInput.fill('+5123567825');

// await iframe.locator('select[name="currencyCode"]').selectOption('TRY')

await termsCheckbox.check();
await attestationCheckbox.check();
await notifyPromotionsCheckbox.check();

await createAccountButton.click(); // ⏳ waiting...

// const successContainer = iframe.locator('section').first();
// await expect(successContainer).toBeVisible({ timeout: 15000 });
const playButton = iframe.getByTestId('play-button');
await expect(playButton, `The user is not registered successfully`).toBeVisible({ timeout: 15000 });
});

