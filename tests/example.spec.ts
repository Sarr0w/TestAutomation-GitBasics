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

test(`checking checkbox`, async ({page})=> {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');

  let firstCheckbox = page.locator('input[type="checkbox"]').first();
  let secondCheckbox = page.locator('input[type="checkbox"]').nth(1);

  await expect(firstCheckbox).not.toBeChecked();
  await expect(secondCheckbox).toBeChecked();

  await firstCheckbox.check();
  await secondCheckbox.uncheck();

  await expect(firstCheckbox).toBeChecked();
  await expect(secondCheckbox).not.toBeChecked();
});

test (`dropdown selection`, async ({page})=> {
  await page.goto('https://the-internet.herokuapp.com/dropdown');

  let dropdown = page.locator('#dropdown');

  await dropdown.selectOption('1');
  await expect(dropdown).toHaveValue('1');

  await dropdown.selectOption('2');
  await expect(dropdown).toHaveValue('2');
});

test(`add/remove elements`, async ({page})=> {
  await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');

  let addButton = page.getByRole('button', { name: 'Add Element' });

  await addButton.click();
  await addButton.click();
  await addButton.click();

  let deleteButtons = page.getByRole('button', { name: 'Delete' });

  await expect(deleteButtons).toHaveCount(3);

  await deleteButtons.nth(0).click();
  await expect(deleteButtons).toHaveCount(2);

  await deleteButtons.nth(0).click();
  await expect(deleteButtons).toHaveCount(1);

  await deleteButtons.nth(0).click();
  await expect(deleteButtons).toHaveCount(0);
});

test(`forgotten password`, async ({page})=> {
  await page.goto('https://the-internet.herokuapp.com/forgot_password');

  let emailInput = page.getByRole('textbox', { name: 'E-mail' });        
  let retrieveButton = page.getByRole('button', { name: 'Retrieve password' });

  await emailInput.fill('test@example.com');
  await retrieveButton.click();

  let confirmationMessage = page.getByText('Internal Server Error');

  await expect(confirmationMessage).toBeVisible();
});

test (`drag and drop`, async ({page})=> {
  await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

  let boxA = page.locator('#column-a');
  let boxB = page.locator('#column-b');

  await expect(boxA).toHaveText('A');
  await expect(boxB).toHaveText('B');

  await boxA.dragTo(boxB);

  await expect(boxA).toHaveText('B');
  await expect(boxB).toHaveText('A');
});