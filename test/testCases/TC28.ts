import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { addProductToCart, goToCart } from '../helpers/inventory';
import { proceedToCheckout, fillCheckoutInformation, continueToOverview, getCheckoutError } from '../helpers/cart';

const PRODUCT_NAME = 'Sauce Labs Backpack';

/**
 * TC28 - Submitting checkout step one with an empty first name shows the
 * "First Name is required" validation error and keeps the user on the
 * same page.
 */
export async function TC28(page: Page) {
  await login(page);

  await addProductToCart(page, PRODUCT_NAME);
  await goToCart(page);
  await proceedToCheckout(page);

  await fillCheckoutInformation(page, {
    firstName: '',
    lastName: 'Doe',
    postalCode: '12345',
  });
  await continueToOverview(page);

  await expect(page).toHaveURL(/checkout-step-one\.html/);
  const error = await getCheckoutError(page);
  expect(error).toContain('First Name is required');
}
