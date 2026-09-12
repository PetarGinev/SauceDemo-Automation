import { Page, Locator, expect } from '@playwright/test';

// Selectors
export const SHOPPING_CART_CONTAINER = '.shopping_cart_link';
export const INVENTORY_CONTAINER = '#inventory_container';
export const INVENTORY_LIST = '.inventory_list';
export const INVENTORY_ITEM = '.inventory_item';
export const INVENTORY_ITEM_NAME = '.inventory_item_name';
export const INVENTORY_ITEM_PRICE = '.inventory_item_price';
export const INVENTORY_ITEM_IMG = '.inventory_item_img img';
export const SORT_DROPDOWN = '[data-test="product-sort-container"]';
export const SHOPPING_CART_BADGE = '.shopping_cart_badge';
export const INVENTORY_DETAILS_NAME = '.inventory_details_name';
export const BACK_TO_PRODUCTS_BTN = '#back-to-products';

// Text used for role-based lookups (buttons are scoped per product card)
export const ADD_TO_CART_TEXT = 'Add to cart';
export const REMOVE_TEXT = 'Remove';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

// Helper functions
/** Returns the locator for a single inventory item card by its product name. */
export function getInventoryItem(page: Page, productName: string): Locator {
  return page.locator(INVENTORY_ITEM).filter({ hasText: productName });
}

/** Returns all product names currently rendered on the inventory page. */
export async function getProductNames(page: Page) {
  return page.locator(INVENTORY_ITEM_NAME).allTextContents();
}

/** Returns all product prices (as numbers) in the order they are rendered. */
export async function getProductPrices(page: Page) {
  const priceTexts = await page.locator(INVENTORY_ITEM_PRICE).allTextContents();
  return priceTexts.map((price) => parseFloat(price.replace('$', '')));
}

/** Selects a sort option from the "Sort by" dropdown on the inventory page. */
export async function sortProductsBy(page: Page, option: SortOption) {
  await page.locator(SORT_DROPDOWN).selectOption(option);
}

/** Clicks "Add to cart" for a given product, identified by its visible name. */
export async function addProductToCart(page: Page, productName: string) {
  await getInventoryItem(page, productName)
    .getByRole('button', { name: ADD_TO_CART_TEXT })
    .click();
}

/** Adds several products to the cart in sequence. */
export async function addProductsToCart(page: Page, productNames: string[]) {
  for (const name of productNames) {
    await addProductToCart(page, name);
  }
}

/** Clicks "Remove" for a given product on the inventory page, identified by its visible name. */
export async function removeProductFromCart(page: Page, productName: string) {
  await getInventoryItem(page, productName)
    .getByRole('button', { name: REMOVE_TEXT })
    .click();
}

/** Returns the current cart badge count, or 0 if the badge is not rendered (empty cart). */
export async function getCartBadgeCount(page: Page) {
  const badge = page.locator(SHOPPING_CART_BADGE);
  if ((await badge.count()) === 0) {
    return 0;
  }
  return Number(await badge.textContent());
}

/** Navigates from the inventory page to the cart page via the cart icon. */
export async function goToCart(page: Page) {
  await page.locator(SHOPPING_CART_CONTAINER).click();
  await expect(page).toHaveURL(/cart\.html/);
}

/** Clicks a product's name/title to open its product detail page. */
export async function openProductDetails(page: Page, productName: string) {
  await getInventoryItem(page, productName).locator(INVENTORY_ITEM_NAME).click();
  await expect(page).toHaveURL(/inventory-item\.html/);
}

/** Returns the product title shown on the product detail page. */
export async function getProductDetailsName(page: Page) {
  return page.locator(INVENTORY_DETAILS_NAME).textContent();
}

/** Clicks "Back to products" on the product detail page. */
export async function backToProducts(page: Page) {
  await page.locator(BACK_TO_PRODUCTS_BTN).click();
  await expect(page).toHaveURL(/inventory\.html/);
}
