import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { addProductToCart, goToCart, getCartBadgeCount } from '../helpers/inventory';
import { getCartItemNames, removeItemFromCart } from '../helpers/cart';

const PRODUCT_NAME = 'Sauce Labs Fleece Jacket';

/**
 * TC24 - Removing an item directly from the cart page updates both the
 * cart's item list and the cart badge count on subsequent pages.
 */
export async function TC24(page: Page) {
  await login(page);

  await addProductToCart(page, PRODUCT_NAME);
  await goToCart(page);

  await removeItemFromCart(page, PRODUCT_NAME);

  const cartItemNames = await getCartItemNames(page);
  expect(cartItemNames).toHaveLength(0);
  expect(await getCartBadgeCount(page)).toBe(0);
}
