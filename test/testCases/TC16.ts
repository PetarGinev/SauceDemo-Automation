import { expect, Page } from "@playwright/test";
import { login } from "../helpers/login";
import { INVENTORY_CONTAINER } from "../helpers/inventory";

/* TC16: Verify that the authenticated user remains logged in after refreshing the page.
* Test Steps:
1. Navigate to the the login page.
2. Enter valid username in the Username field.
3. Enter valid password in the Password field.
4. Click the Login button.
5. Reload the page.

* Expected result:
1. Login page is displayed.
2. Username is entered successfully.
3. Password is entered successfully.
4. The user is successfully logged in and redirected to the Products page.
5. The user remains logged in and the Products page is displayed after the page reload.
*/

export default async function (page: Page) {
    // 1 2 3 4
    await login(page);

    // 5
    await page.reload();
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator(INVENTORY_CONTAINER).first()).toBeVisible();
}
