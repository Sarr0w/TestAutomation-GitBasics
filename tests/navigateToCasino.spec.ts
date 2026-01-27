import { test, expect } from '@playwright/test';
test('Navigation to Kazan => Casino', async ({ page }) => {

  await page.goto('https://kazancasino-stage.fsclub.tech/'); // 6018ms

   const loginButton = page.locator('#navCasino');
    await loginButton.click(); // ⏳ waiting...
    await expect(page).toHaveURL(`https://kazancasino-stage.fsclub.tech/new/casino/`);
});