import { expect, Page } from "@playwright/test";
import { login } from "../helpers/login";
import { SHOPPING_CART_CONTAINER, INVENTORY_CONTAINER } from "../helpers/inventory";
import { CART_CONTENTS_CONTAINER, CONTINUE_SHOPPING_BTN } from "../helpers/cart";

/* TC17: Verify that the user remains logged in when navigating between application pages.
* Test Steps:
1. Navigate to the the login page.
2. Enter valid username in the Username field.
3. Enter valid password in the Password field.
4. Click the Login button.
5. Navigate to the Cart page.
6. Navigate back to the Products page.

* Expected result:
1. Login page is displayed.
2. Username is entered successfully.
3. Password is entered successfully.
4. The user is successfully logged in and redirected to the Products page.
5. The Cart page is displayed without requiring the user to log in again.
6. The Products page is displayed without requiring the user to log in again.
*/

export default async function (page: Page) {
    // 1 2 3 4
    await login(page);

    // 5
    await page.locator(SHOPPING_CART_CONTAINER).click();
    await expect(page).toHaveURL(/cart/);
    await expect(page.locator(CART_CONTENTS_CONTAINER)).toBeVisible();

    // 6
    await page.locator(CONTINUE_SHOPPING_BTN).click();
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator(INVENTORY_CONTAINER).first()).toBeVisible();
}
