import { test } from '@playwright/test';
import { TC27 } from './testCases/TC27';
import { TC28 } from './testCases/TC28';
import { TC29 } from './testCases/TC29';
import { TC30 } from './testCases/TC30';
import { TC41 } from './testCases/TC41';
import { TC42 } from './testCases/TC42';
import { TC43 } from './testCases/TC43';
import { TC44 } from './testCases/TC44';
import { TC45 } from './testCases/TC45';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Checkout flow test suite', () => {
  test('TC27 - Valid checkout information navigates to the overview page', async ({ page }) => {
    await TC27(page);
  });

  test('TC28 - Missing first name shows a validation error', async ({ page }) => {
    await TC28(page);
  });

  test('TC29 - Missing postal code shows a validation error', async ({ page }) => {
    await TC29(page);
  });

  test('TC30 - Full checkout flow completes with a confirmation message', async ({ page }) => {
    await TC30(page);
  });

  test('TC41 - Missing last name shows a validation error', async ({ page }) => {
    await TC41(page);
  });

  test('TC42 - Checkout overview shows correct subtotal, tax and total', async ({ page }) => {
    await TC42(page);
  });

  test('TC43 - Cancel on checkout step one returns to the cart page', async ({ page }) => {
    await TC43(page);
  });

  test('TC44 - Cancel on checkout overview returns to the inventory page', async ({ page }) => {
    await TC44(page);
  });

  test('TC45 - Back Home on checkout complete page returns to the inventory page', async ({ page }) => {
    await TC45(page);
  });
});
