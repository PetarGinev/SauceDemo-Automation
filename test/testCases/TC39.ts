import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { addProductToCart, goToCart, getCartBadgeCount } from '../helpers/inventory';
import { continueShopping, getCartItemNames } from '../helpers/cart';

const PRODUCT_NAME = 'Sauce Labs Bolt T-Shirt';

/**
 * TC39 - Items added to the cart persist after navigating from cart back
 * to inventory (via "Continue Shopping") and back to the cart again.
 */
export async function TC39(page: Page): Promise<void> {
  await login(page);

  await addProductToCart(page, PRODUCT_NAME);
  await goToCart(page);
  await continueShopping(page);

  expect(await getCartBadgeCount(page)).toBe(1);

  await goToCart(page);

  const cartItemNames = await getCartItemNames(page);
  expect(cartItemNames).toEqual([PRODUCT_NAME]);
}
