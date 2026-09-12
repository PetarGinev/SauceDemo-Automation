import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { sortProductsBy, getProductNames, SORT_DROPDOWN } from '../helpers/inventory';

/**
 * TC33 - Sorting products by "Name (Z to A)" reorders the inventory list
 * into reverse alphabetical order.
 */
export async function TC33(page: Page): Promise<void> {
  await login(page);

  await sortProductsBy(page, 'za');

  const names = await getProductNames(page);
  const sortedDescending = [...names].sort((a, b) => b.localeCompare(a));

  expect(names).toEqual(sortedDescending);
  await expect(page.locator(SORT_DROPDOWN)).toHaveValue('za');
}
