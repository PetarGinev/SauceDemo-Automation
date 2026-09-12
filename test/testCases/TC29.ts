import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { addProductToCart, goToCart } from '../helpers/inventory';
import { proceedToCheckout, fillCheckoutInformation, continueToOverview, getCheckoutError } from '../helpers/cart';

const PRODUCT_NAME = 'Sauce Labs Backpack';

/**
 * TC29 - Submitting checkout step one with an empty postal code shows the
 * "Postal Code is required" validation error and keeps the user on the
 * same page.
 */
export async function TC29(page: Page): Promise<void> {
  await login(page);

  await addProductToCart(page, PRODUCT_NAME);
  await goToCart(page);
  await proceedToCheckout(page);

  await fillCheckoutInformation(page, {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '',
  });
  await continueToOverview(page);

  await expect(page).toHaveURL(/checkout-step-one\.html/);
  const error = await getCheckoutError(page);
  expect(error).toContain('Postal Code is required');
}
