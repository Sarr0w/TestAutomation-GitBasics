import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
test('successful login', async ({page})=> {
  await page.goto('https://the-internet.herokuapp.com');
  await page.getByRole('link', { name: 'Form Authentication' }).click();

  let username = page.getByRole('textbox', { name: 'Username' } );
  let password = page.getByRole('textbox', { name: 'Password' } );
  let loginButton = page.getByRole('button', { name: 'Login' } );

  await username.fill('tomsmith');
  await password.fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();

  let successMessage = page.getByText('You logged into a secure area!');

  await expect(successMessage).toBeVisible();
});