import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { addProductsToCart, getCartBadgeCount } from '../helpers/inventory';

const PRODUCTS = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];

/**
 * TC34 - Adding several products to the cart in sequence accumulates the
 * cart badge count correctly (one increment per product).
 */
export async function TC34(page: Page): Promise<void> {
  await login(page);

  expect(await getCartBadgeCount(page)).toBe(0);

  await addProductsToCart(page, PRODUCTS);

  expect(await getCartBadgeCount(page)).toBe(PRODUCTS.length);
}
