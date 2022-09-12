import { test, expect } from '@playwright/test';

test.use({ javaScriptEnabled: false });

test('Check if website is rendered correctly without JavaScript', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expect title to be as usual
  await expect(page).toHaveTitle('Are We Anti-Cheat Yet?');

  const themeToggle = await page.$('//*[contains(@class, "icon-tabler-sun")]/ancestor::button');
  const color = await themeToggle?.evaluate((el) => window.getComputedStyle(el).getPropertyValue('color'));

  // Expect sun icon color to be yellow (indicates that css was loaded correctly)
  expect(color).toBe('rgb(255, 212, 59)');
});
