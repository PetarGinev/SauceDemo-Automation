import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import {
  getProductNames,
  getProductPrices,
  INVENTORY_ITEM,
  INVENTORY_ITEM_IMG,
} from '../helpers/inventory';

/**
 * TC19 - Inventory page displays all six products with name, price and image
 * after a standard user logs in.
 */
export async function TC19(page: Page): Promise<void> {
  await login(page);

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator(INVENTORY_ITEM)).toHaveCount(6);

  const names = await getProductNames(page);
  const prices = await getProductPrices(page);

  expect(names).toHaveLength(6);
  expect(prices).toHaveLength(6);
  names.forEach((name) => expect(name.trim().length).toBeGreaterThan(0));
  prices.forEach((price) => expect(price).toBeGreaterThan(0));

  await expect(page.locator(INVENTORY_ITEM_IMG)).toHaveCount(6);
}
