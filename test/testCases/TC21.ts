import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { addProductToCart, getInventoryItem, getCartBadgeCount } from '../helpers/inventory';

const PRODUCT_NAME = 'Sauce Labs Backpack';

/**
 * TC21 - Adding a product to the cart from the inventory page updates the
 * cart badge count and swaps the "Add to cart" button for a "Remove" button.
 */
export async function TC21(page: Page): Promise<void> {
  await login(page);

  expect(await getCartBadgeCount(page)).toBe(0);

  await addProductToCart(page, PRODUCT_NAME);

  expect(await getCartBadgeCount(page)).toBe(1);
  await expect(
    getInventoryItem(page, PRODUCT_NAME).getByRole('button', { name: 'Remove' })
  ).toBeVisible();
}
