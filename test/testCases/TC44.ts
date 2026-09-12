import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { addProductToCart, goToCart } from '../helpers/inventory';
import {
  proceedToCheckout,
  fillCheckoutInformation,
  continueToOverview,
  cancelCheckoutOverview,
} from '../helpers/cart';

const PRODUCT_NAME = 'Sauce Labs Backpack';

/**
 * TC44 - Clicking "Cancel" on the checkout overview (step two) page
 * returns the user to the inventory page without completing the order.
 */
export async function TC44(page: Page) {
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

  await cancelCheckoutOverview(page);

  await expect(page).toHaveURL(/inventory\.html/);
}
