import { expect, Page } from "@playwright/test";
import {ID_PASSWORD, STANDARD_PASSWORD } from "../helpers/login";

/* TC11: Verify the Password field masks entered characters.
* Test Steps:
1. Navigate to the Login page.
2. Click the Password field.
3. Enter any password in the Password field.
4. Observe the Password field.

* Expected result:
1. The Login page is displayed.
2. The Password field receives focus.
3. The password is entered successfully.
4. The entered characters are masked (displayed as dots) instead of plain text.
*/

export default async function (page: Page) {
    // 1 2 3
    await page.fill(ID_PASSWORD, STANDARD_PASSWORD);

    // 4
    await expect(page.locator(ID_PASSWORD)).toHaveValue(STANDARD_PASSWORD);
    await expect(page.locator(ID_PASSWORD)).toHaveAttribute('type', 'password');
}