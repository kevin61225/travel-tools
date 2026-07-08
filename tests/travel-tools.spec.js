const { test, expect } = require('@playwright/test');
const { pathToFileURL } = require('url');
const path = require('path');

function appUrl() {
  const absolutePath = path.resolve(__dirname, '..', 'index.html');
  return pathToFileURL(absolutePath).href;
}

test.beforeEach(async ({ page }) => {
  // Force fallback rates to avoid network flakiness.
  await page.route('https://open.er-api.com/**', route => route.abort());
  await page.goto(appUrl());
});

test('shows fallback exchange status and converted amount', async ({ page }) => {
  await expect(page.locator('#rateInfo')).toContainText('備用匯率');

  const fromInput = page.locator('#fromAmt');
  const toInput = page.locator('#toAmt');

  await fromInput.fill('1000');
  await fromInput.dispatchEvent('input');

  await expect(toInput).not.toHaveValue('');
  await expect(toInput).not.toHaveValue('0');
});

test('supports calculator expression and send to converter', async ({ page }) => {
  await page.getByRole('button', { name: '3' }).click();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('button', { name: '5' }).click();
  await page.getByRole('button', { name: '=' }).click();

  await expect(page.locator('#calcResult')).toHaveText('8');

  await page.locator('#sendToConv').click();
  await expect(page.locator('#fromAmt')).toHaveValue('8');
});

test('can toggle theme and persist with localStorage', async ({ page }) => {
  const html = page.locator('html');

  const initialTheme = await html.getAttribute('data-theme');
  await page.locator('#themeBtn').click();

  const toggledTheme = await html.getAttribute('data-theme');
  expect(toggledTheme).not.toBe(initialTheme);

  const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
  expect(storedTheme).toBe(toggledTheme);
});

test('can search and change target currency via modal', async ({ page }) => {
  const toCurButton = page.locator('#toCurBtn');

  await toCurButton.click();
  await page.locator('#curSearch').fill('美金');
  await page.locator('#curList .cur-item[data-code="USD"]').click();

  await expect(toCurButton).toContainText('USD');
});
