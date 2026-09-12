import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { openProductDetails, getProductDetailsName, backToProducts } from '../helpers/inventory';

const PRODUCT_NAME = 'Sauce Labs Bike Light';

/**
 * TC35 - Clicking a product's name on the inventory page opens its product
 * detail page showing the matching title, and "Back to products" returns
 * to the inventory page.
 */
export async function TC35(page: Page): Promise<void> {
  await login(page);

  await openProductDetails(page, PRODUCT_NAME);

  const detailsTitle = await getProductDetailsName(page);
  expect(detailsTitle).toBe(PRODUCT_NAME);

  await backToProducts(page);
  await expect(page).toHaveURL(/inventory\.html/);
}
