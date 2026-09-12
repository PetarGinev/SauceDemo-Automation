import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { sortProductsBy, getProductPrices, SORT_DROPDOWN } from '../helpers/inventory';

/**
 * TC32 - Sorting products by "Price (high to low)" reorders the inventory
 * list so that prices are in strictly descending order.
 */
export async function TC32(page: Page): Promise<void> {
  await login(page);

  await sortProductsBy(page, 'hilo');

  const prices = await getProductPrices(page);
  const sortedDescending = [...prices].sort((a, b) => b - a);

  expect(prices).toEqual(sortedDescending);
  await expect(page.locator(SORT_DROPDOWN)).toHaveValue('hilo');
}
