import { test, expect } from '@playwright/test';

test.use({ javaScriptEnabled: false });

test('Check if website is rendered correctly without JavaScript', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expect title to be as usual
  await expect(page).toHaveTitle('Are We Anti-Cheat Yet?');

  const body = await page.$('body');
  const color = await body?.evaluate((el) => window.getComputedStyle(el).getPropertyValue('background-color'));

  // Expect page background to be dark (indicates that css was loaded correctly)
  expect(color).toBe('rgb(26, 27, 30)');
});
