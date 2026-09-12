import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { getProductNames, SORT_DROPDOWN } from '../helpers/inventory';

/**
 * TC31 - The inventory page defaults to "Name (A to Z)" sorting when the
 * user first lands on it after login, and products are alphabetically
 * ordered accordingly.
 */
export async function TC31(page: Page): Promise<void> {
  await login(page);

  await expect(page.locator(SORT_DROPDOWN)).toHaveValue('az');

  const names = await getProductNames(page);
  const sortedAlphabetically = [...names].sort((a, b) => a.localeCompare(b));

  expect(names).toEqual(sortedAlphabetically);
}
