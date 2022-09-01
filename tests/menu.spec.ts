import { test, expect } from '@playwright/test';

test('Check if menu buttons work', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('.mantine-Alert-root'); // Ensures JavaScript is properly loaded

    const themeToggle = await page.$('//*[contains(@class, "icon-tabler-sun")]/ancestor::button');
    await themeToggle!!.click();

    // eslint-disable-next-line no-promise-executor-return
    await new Promise(resolve => setTimeout(resolve, 10000));

    const body = await page.$('body');
    await page.waitForFunction(el => window.getComputedStyle(el!!).getPropertyValue('background-color') === 'rgb(255, 255, 255)', body);

    // Expect page background to be dark (indicates that css was loaded correctly)
    const color = await body?.evaluate((el) => window.getComputedStyle(el).getPropertyValue('background-color'));
    expect(color).toBe('rgb(255, 255, 255)');
});
