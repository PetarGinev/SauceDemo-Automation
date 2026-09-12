import { test } from '@playwright/test';
import { TC19 } from './testCases/TC19';
import { TC20 } from './testCases/TC20';
import { TC21 } from './testCases/TC21';
import { TC22 } from './testCases/TC22';
import { TC31 } from './testCases/TC31';
import { TC32 } from './testCases/TC32';
import { TC33 } from './testCases/TC33';
import { TC34 } from './testCases/TC34';
import { TC35 } from './testCases/TC35';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Inventory page test suite', () => {
  test('TC19 - Inventory page displays all six products', async ({ page }) => {
    await TC19(page);
  });

  test('TC20 - Sorting products by price (low to high) reorders the list', async ({ page }) => {
    await TC20(page);
  });

  test('TC21 - Adding a product to cart updates the cart badge', async ({ page }) => {
    await TC21(page);
  });

  test('TC22 - Removing a product from cart via inventory page updates the cart badge', async ({ page }) => {
    await TC22(page);
  });

  test('TC31 - Default sort order is Name (A to Z)', async ({ page }) => {
    await TC31(page);
  });

  test('TC32 - Sorting products by price (high to low) reorders the list', async ({ page }) => {
    await TC32(page);
  });

  test('TC33 - Sorting products by name (Z to A) reorders the list', async ({ page }) => {
    await TC33(page);
  });

  test('TC34 - Adding multiple products shows the correct cumulative cart badge count', async ({ page }) => {
    await TC34(page);
  });

  test('TC35 - Clicking a product name opens its product detail page', async ({ page }) => {
    await TC35(page);
  });
});
