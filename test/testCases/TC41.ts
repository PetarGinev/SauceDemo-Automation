import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { addProductToCart, goToCart } from '../helpers/inventory';
import { proceedToCheckout, fillCheckoutInformation, continueToOverview, getCheckoutError } from '../helpers/cart';

const PRODUCT_NAME = 'Sauce Labs Backpack';

/**
 * TC41 - Submitting checkout step one with an empty last name shows the
 * "Last Name is required" validation error and keeps the user on the
 * same page.
 */
export async function TC41(page: Page) {
  await login(page);

  await addProductToCart(page, PRODUCT_NAME);
  await goToCart(page);
  await proceedToCheckout(page);

  await fillCheckoutInformation(page, {
    firstName: 'John',
    lastName: '',
    postalCode: '12345',
  });
  await continueToOverview(page);

  await expect(page).toHaveURL(/checkout-step-one\.html/);
  const error = await getCheckoutError(page);
  expect(error).toContain('Last Name is required');
}
