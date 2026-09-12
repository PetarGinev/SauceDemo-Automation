import { Page, expect } from '@playwright/test';
import { REMOVE_TEXT } from "../helpers/inventory";

// Selectors
export const CART_CONTENTS_CONTAINER = "#cart_contents_container";
export const CONTINUE_SHOPPING_BTN = "#continue-shopping";
export const CART_LIST = '.cart_list';
export const CART_ITEM = '.cart_item';
export const CART_ITEM_NAME = '.cart_item .inventory_item_name';
export const CART_QUANTITY = '.cart_quantity';
export const BTN_CHECKOUT = '#checkout';
export const ID_FIRST_NAME = '#first-name';
export const ID_LAST_NAME = '#last-name';
export const ID_POSTAL_CODE = '#postal-code';
export const BTN_CONTINUE = '#continue';
export const BTN_CHECKOUT_CANCEL = '#cancel';
export const CHECKOUT_ERROR = '[data-test="error"]';
export const SUMMARY_SUBTOTAL = '.summary_subtotal_label';
export const SUMMARY_TAX = '.summary_tax_label';
export const SUMMARY_TOTAL = '.summary_total_label';
export const BTN_FINISH = '#finish';
export const CHECKOUT_COMPLETE_HEADER = '.complete-header';
export const BTN_BACK_HOME = '#back-to-products';

// Helper functions
export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

/** Returns all product names currently listed on the cart page. */
export async function getCartItemNames(page: Page) {
  return page.locator(CART_ITEM_NAME).allTextContents();
}

/** Returns the quantity value shown for each line item on the cart page. */
export async function getCartItemQuantities(page: Page) {
  return page.locator(CART_QUANTITY).allTextContents();
}

/** Removes a specific item from the cart page by its visible product name. */
export async function removeItemFromCart(page: Page, productName: string) {
  await page
    .locator(CART_ITEM)
    .filter({ hasText: productName })
    .getByRole('button', { name: REMOVE_TEXT })
    .click();
}

/** Clicks "Continue Shopping" and waits for navigation back to the inventory page. */
export async function continueShopping(page: Page) {
  await page.locator(CONTINUE_SHOPPING_BTN).click();
  await expect(page).toHaveURL(/inventory\.html/);
}

/** Clicks "Checkout" from the cart page and waits for navigation to checkout step one. */
export async function proceedToCheckout(page: Page) {
  await page.locator(BTN_CHECKOUT).click();
  await expect(page).toHaveURL(/checkout-step-one\.html/);
}

/** Fills in the "Your Information" form on checkout step one. */
export async function fillCheckoutInformation(page: Page, info: CheckoutInfo) {
  await page.locator(ID_FIRST_NAME).fill(info.firstName);
  await page.locator(ID_LAST_NAME).fill(info.lastName);
  await page.locator(ID_POSTAL_CODE).fill(info.postalCode);
}

/** Clicks "Continue" on checkout step one. */
export async function continueToOverview(page: Page) {
  await page.locator(BTN_CONTINUE).click();
}

/** Clicks "Cancel" on checkout step one, returning to the cart page. */
export async function cancelCheckoutStepOne(page: Page) {
  await page.locator(BTN_CHECKOUT_CANCEL).click();
  await expect(page).toHaveURL(/cart\.html/);
}

/** Clicks "Cancel" on checkout step two (overview), returning to the inventory page. */
export async function cancelCheckoutOverview(page: Page) {
  await page.locator(BTN_CHECKOUT_CANCEL).click();
  await expect(page).toHaveURL(/inventory\.html/);
}

/** Returns the validation error message shown on the checkout form, if any. */
export async function getCheckoutError(page: Page) {
  return page.locator(CHECKOUT_ERROR).textContent();
}

/** Returns the subtotal, tax and total labels shown on the checkout overview page. */
export async function getOrderSummary(page: Page) {
  return {
    subtotal: await page.locator(SUMMARY_SUBTOTAL).textContent(),
    tax: await page.locator(SUMMARY_TAX).textContent(),
    total: await page.locator(SUMMARY_TOTAL).textContent(),
  };
}

/** Clicks "Finish" on checkout step two (overview) and waits for the confirmation page. */
export async function finishCheckout(page: Page) {
  await page.locator(BTN_FINISH).click();
  await expect(page).toHaveURL(/checkout-complete\.html/);
}

/** Clicks "Back Home" on the checkout complete page, returning to the inventory page. */
export async function backToHome(page: Page) {
  await page.locator(BTN_BACK_HOME).click();
  await expect(page).toHaveURL(/inventory\.html/);
}
