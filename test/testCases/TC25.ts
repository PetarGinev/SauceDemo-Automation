import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { goToCart } from '../helpers/inventory';
import { continueShopping } from '../helpers/cart';

/**
 * TC25 - The "Continue Shopping" button on the cart page navigates the user
 * back to the inventory page without altering the cart contents.
 */
export async function TC25(page: Page) {
  await login(page);

  await goToCart(page);
  await continueShopping(page);

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('.inventory_item')).toHaveCount(6);
}
