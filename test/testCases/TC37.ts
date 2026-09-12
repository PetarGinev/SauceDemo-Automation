import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { addProductsToCart, goToCart, getCartBadgeCount } from '../helpers/inventory';
import { getCartItemNames, removeItemFromCart, CART_ITEM } from '../helpers/cart';

const PRODUCTS = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

/**
 * TC37 - Removing every item from the cart page, one by one, leaves the
 * cart empty with no line items and a zeroed badge count.
 */
export async function TC37(page: Page): Promise<void> {
  await login(page);

  await addProductsToCart(page, PRODUCTS);
  await goToCart(page);

  for (const product of PRODUCTS) {
    await removeItemFromCart(page, product);
  }

  await expect(page.locator(CART_ITEM)).toHaveCount(0);
  expect(await getCartItemNames(page)).toHaveLength(0);
  expect(await getCartBadgeCount(page)).toBe(0);
}
