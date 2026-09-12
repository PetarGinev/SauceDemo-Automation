import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { addProductsToCart, goToCart, getCartBadgeCount } from '../helpers/inventory';
import { getCartItemNames, CART_ITEM } from '../helpers/cart';

const PRODUCTS = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket'];

/**
 * TC36 - The cart badge count on the inventory page matches the number of
 * line items actually rendered on the cart page.
 */
export async function TC36(page: Page): Promise<void> {
  await login(page);

  await addProductsToCart(page, PRODUCTS);
  const badgeCount = await getCartBadgeCount(page);

  await goToCart(page);

  await expect(page.locator(CART_ITEM)).toHaveCount(badgeCount);
  const cartItemNames = await getCartItemNames(page);
  expect(cartItemNames).toHaveLength(PRODUCTS.length);
}
