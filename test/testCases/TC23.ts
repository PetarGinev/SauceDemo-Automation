import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { addProductToCart, goToCart } from '../helpers/inventory';
import { getCartItemNames } from '../helpers/cart';

const PRODUCTS = ['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt'];

/**
 * TC23 - Products added on the inventory page appear correctly on the cart
 * page, with the right names and item count.
 */
export async function TC23(page: Page): Promise<void> {
  await login(page);

  for (const product of PRODUCTS) {
    await addProductToCart(page, product);
  }

  await goToCart(page);

  const cartItemNames = await getCartItemNames(page);
  expect(cartItemNames).toHaveLength(PRODUCTS.length);
  expect(cartItemNames.sort()).toEqual([...PRODUCTS].sort());
}
