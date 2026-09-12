import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { addProductsToCart, removeProductFromCart, goToCart } from '../helpers/inventory';
import { getCartItemNames } from '../helpers/cart';

const PRODUCTS = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket'];

/**
 * TC40 - Removing one of two previously added products from the inventory
 * page (after having already visited the cart) is reflected correctly
 * when returning to the cart: only the remaining product is listed.
 */
export async function TC40(page: Page) {
  await login(page);

  await addProductsToCart(page, PRODUCTS);
  await goToCart(page);

  await page.goBack();
  await removeProductFromCart(page, PRODUCTS[0]);

  await goToCart(page);

  const cartItemNames = await getCartItemNames(page);
  expect(cartItemNames).toEqual([PRODUCTS[1]]);
}
