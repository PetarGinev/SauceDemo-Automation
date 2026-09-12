import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { addProductToCart, goToCart } from '../helpers/inventory';
import {
  proceedToCheckout,
  fillCheckoutInformation,
  continueToOverview,
  finishCheckout,
  backToHome,
} from '../helpers/cart';

const PRODUCT_NAME = 'Sauce Labs Backpack';

/**
 * TC45 - After completing an order, clicking "Back Home" on the checkout
 * complete page returns the user to the (now empty) inventory page.
 */
export async function TC45(page: Page): Promise<void> {
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
  await finishCheckout(page);

  await backToHome(page);

  await expect(page).toHaveURL(/inventory\.html/);
}
