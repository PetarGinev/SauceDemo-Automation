import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { addProductToCart, goToCart } from '../helpers/inventory';
import { proceedToCheckout, ID_FIRST_NAME } from '../helpers/cart';

const PRODUCT_NAME = 'Sauce Labs Onesie';

/**
 * TC26 - The "Checkout" button on the cart page navigates to checkout step
 * one, provided the cart contains at least one item.
 */
export async function TC26(page: Page) {
  await login(page);

  await addProductToCart(page, PRODUCT_NAME);
  await goToCart(page);
  await proceedToCheckout(page);

  await expect(page).toHaveURL(/checkout-step-one\.html/);
  await expect(page.locator(ID_FIRST_NAME)).toBeVisible();
}
