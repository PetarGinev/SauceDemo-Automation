import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { sortProductsBy, getProductPrices, SORT_DROPDOWN } from '../helpers/inventory';

/**
 * TC20 - Sorting products by "Price (low to high)" reorders the inventory
 * list so that prices are in strictly ascending order.
 */
export async function TC20(page: Page): Promise<void> {
  await login(page);

  await sortProductsBy(page, 'lohi');

  const prices = await getProductPrices(page);
  const sortedAscending = [...prices].sort((a, b) => a - b);

  expect(prices).toEqual(sortedAscending);
  await expect(page.locator(SORT_DROPDOWN)).toHaveValue('lohi');
}
