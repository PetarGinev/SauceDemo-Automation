import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { addProductsToCart, goToCart } from '../helpers/inventory';
import { proceedToCheckout, fillCheckoutInformation, continueToOverview, getOrderSummary } from '../helpers/cart';

const PRODUCTS = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

/**
 * TC42 - The checkout overview page shows a positive item subtotal, and a
 * total that equals subtotal + tax (regardless of which products were
 * added, so the assertion stays correct if SauceDemo's tax rate changes).
 */
export async function TC42(page: Page): Promise<void> {
  await login(page);

  await addProductsToCart(page, PRODUCTS);
  await goToCart(page);
  await proceedToCheckout(page);

  await fillCheckoutInformation(page, {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
  });
  await continueToOverview(page);

  const summary = await getOrderSummary(page);

  const subtotal = parseFloat(summary.subtotal!.replace('Item total: $', ''));
  const tax = parseFloat(summary.tax!.replace('Tax: $', ''));
  const total = parseFloat(summary.total!.replace('Total: $', ''));

  expect(subtotal).toBeGreaterThan(0);
  expect(Math.round((subtotal + tax) * 100) / 100).toBe(Math.round(total * 100) / 100);
}
