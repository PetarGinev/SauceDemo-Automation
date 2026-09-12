import { test } from '@playwright/test';
import { TC23 } from './testCases/TC23';
import { TC24 } from './testCases/TC24';
import { TC25 } from './testCases/TC25';
import { TC26 } from './testCases/TC26';
import { TC36 } from './testCases/TC36';
import { TC37 } from './testCases/TC37';
import { TC38 } from './testCases/TC38';
import { TC39 } from './testCases/TC39';
import { TC40 } from './testCases/TC40';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Cart page test suite', () => {
  test('TC23 - Cart page displays items added from inventory', async ({ page }) => {
    await TC23(page);
  });

  test('TC24 - Removing an item from cart page updates cart and badge', async ({ page }) => {
    await TC24(page);
  });

  test('TC25 - Continue Shopping navigates back to inventory page', async ({ page }) => {
    await TC25(page);
  });

  test('TC26 - Checkout button navigates to checkout step one', async ({ page }) => {
    await TC26(page);
  });

  test('TC36 - Cart badge count matches the number of items on the cart page', async ({ page }) => {
    await TC36(page);
  });

  test('TC37 - Removing every item empties the cart entirely', async ({ page }) => {
    await TC37(page);
  });

  test('TC38 - Cart page shows correct quantity and price per item', async ({ page }) => {
    await TC38(page);
  });

  test('TC39 - Cart contents persist after navigating away and back', async ({ page }) => {
    await TC39(page);
  });

  test('TC40 - Removing a product from inventory page keeps the cart in sync', async ({ page }) => {
    await TC40(page);
  });
});
