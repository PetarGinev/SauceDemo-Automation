import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { addProductToCart, goToCart } from '../helpers/inventory';
import { proceedToCheckout, cancelCheckoutStepOne } from '../helpers/cart';

const PRODUCT_NAME = 'Sauce Labs Backpack';

/**
 * TC43 - Clicking "Cancel" on checkout step one returns the user to the
 * cart page without submitting any checkout information.
 */
export async function TC43(page: Page): Promise<void> {
  await login(page);

  await addProductToCart(page, PRODUCT_NAME);
  await goToCart(page);
  await proceedToCheckout(page);

  await cancelCheckoutStepOne(page);

  await expect(page).toHaveURL(/cart\.html/);
}
