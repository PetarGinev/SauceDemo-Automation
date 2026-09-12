import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import {
  addProductToCart,
  removeProductFromCart,
  getInventoryItem,
  getCartBadgeCount,
} from '../helpers/inventory';

const PRODUCT_NAME = 'Sauce Labs Bike Light';

/**
 * TC22 - Removing a product from the cart via the inventory page's "Remove"
 * button updates the cart badge count back down and restores the
 * "Add to cart" button.
 */
export async function TC22(page: Page) {
  await login(page);

  await addProductToCart(page, PRODUCT_NAME);
  expect(await getCartBadgeCount(page)).toBe(1);

  await removeProductFromCart(page, PRODUCT_NAME);

  expect(await getCartBadgeCount(page)).toBe(0);
  await expect(
    getInventoryItem(page, PRODUCT_NAME).getByRole('button', { name: 'Add to cart' })
  ).toBeVisible();
}
