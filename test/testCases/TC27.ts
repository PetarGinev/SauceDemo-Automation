import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { addProductToCart, goToCart } from '../helpers/inventory';
import { proceedToCheckout, fillCheckoutInformation, continueToOverview } from '../helpers/cart';

const PRODUCT_NAME = 'Sauce Labs Backpack';

/**
 * TC27 - Submitting valid first name, last name and postal code on
 * checkout step one navigates the user to checkout step two (overview).
 */
export async function TC27(page: Page): Promise<void> {
  await login(page);

  await addProductToCart(page, PRODUCT_NAME);
  await goToCart(page);
  await proceedToCheckout(page);

  await fillCheckoutInformation(page, {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
  });
  await continueToOverview(page);

  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await expect(page.locator('.summary_info')).toBeVisible();
}
