import { expect, Page } from "@playwright/test";
import { ID_USERNAME, ID_PASSWORD, STANDARD_USERNAME, STANDARD_PASSWORD, ID_LOGIN_BTN } from "../helpers/login";

/* TC2: Verify the Login button can be activated using the Enter key.
* Test Steps:
1. Navigate to the the login page.
2. Enter valid username in the Username field.
3. Enter valid password in the Password field.
4. Press the Enter key.

* Expected result:
1. Login page is displayed.
2. Username is entered successfully.
3. Password is entered successfully.
4. User is redirected to the Products page.
*/

export default async function (page: Page) {
    // 1 2 3
    await page.fill(ID_USERNAME, STANDARD_USERNAME);
    await page.fill(ID_PASSWORD, STANDARD_PASSWORD);

    // 4
    await page.locator(ID_LOGIN_BTN).press("Enter");
    await expect(page).toHaveURL(/inventory/);
}