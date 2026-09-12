import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { addProductToCart, goToCart, getCartBadgeCount } from '../helpers/inventory';
import {
  proceedToCheckout,
  fillCheckoutInformation,
  continueToOverview,
  finishCheckout,
  CHECKOUT_COMPLETE_HEADER,
} from '../helpers/cart';

const PRODUCTS = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

/**
 * TC30 - A full end-to-end checkout: add products, fill in valid
 * information, review the order and finish, ending on the confirmation
 * page with an empty cart.
 */
export async function TC30(page: Page): Promise<void> {
  await login(page);

  for (const product of PRODUCTS) {
    await addProductToCart(page, product);
  }
  await goToCart(page);
  await proceedToCheckout(page);

  await fillCheckoutInformation(page, {
    firstName: 'Jane',
    lastName: 'Smith',
    postalCode: '90210',
  });
  await continueToOverview(page);

  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await finishCheckout(page);

  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(page.locator(CHECKOUT_COMPLETE_HEADER)).toHaveText('Thank you for your order!');
  expect(await getCartBadgeCount(page)).toBe(0);
}
