import { Page, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { addProductsToCart, goToCart, getProductPrices } from '../helpers/inventory';
import { getCartItemQuantities, CART_ITEM, CART_ITEM_NAME } from '../helpers/cart';

const PRODUCTS = ['Sauce Labs Backpack', 'Sauce Labs Onesie'];

/**
 * TC38 - Each line item on the cart page shows a quantity of 1 and its
 * price carries over unchanged from the inventory page.
 */
export async function TC38(page: Page) {
  await login(page);

  const inventoryPrices = await getProductPrices(page);
  await addProductsToCart(page, PRODUCTS);
  await goToCart(page);

  const quantities = await getCartItemQuantities(page);
  quantities.forEach((quantity) => expect(quantity).toBe('1'));

  const cartPriceTexts = await page.locator(`${CART_ITEM} .inventory_item_price`).allTextContents();
  const cartPrices = cartPriceTexts.map((price) => parseFloat(price.replace('$', '')));

  cartPrices.forEach((price) => {
    expect(inventoryPrices).toContain(price);
  });
  expect(await page.locator(CART_ITEM_NAME).count()).toBe(PRODUCTS.length);
}
