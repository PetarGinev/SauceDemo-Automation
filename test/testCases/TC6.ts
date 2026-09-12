import { expect, Page } from "@playwright/test";
import {
    ID_USERNAME,
    ID_PASSWORD,
    STANDARD_PASSWORD,
    ID_LOGIN_BTN,
    FORM_INPUT_ERROR,
    FORM_INPUT_ERROR_ICON,
    ERROR_MESSAGE_CONTAINER,
    USERNAME_ERROR_MESSAGE
} from "../helpers/login";

/* TC6: Verify login with empty username.
* Test Steps:
1. Navigate to the login page.
2. Leave the Username field empty.
3. Enter valid password in the Password field.
4. Click the Login button.

* Expected result:
1. Login page is displayed.
2. Username field is empty.
3. Password is entered successfully.
4. The user remains on the Login page. Both the Username and Password fields are highlighted in red, and the following error message is displayed: "Epic sadface: Username is required".
*/

export default async function (page: Page) {
    // 1 2 3
    await page.fill(ID_PASSWORD, STANDARD_PASSWORD);

    // 4
    await page.locator(ID_LOGIN_BTN).click();

    await expect(page).toHaveURL("/");

    await expect(page.locator(ID_USERNAME)).toContainClass(FORM_INPUT_ERROR);
    await expect(page.locator(FORM_INPUT_ERROR_ICON).nth(0)).toBeVisible();

    await expect(page.locator(ID_PASSWORD)).toContainClass(FORM_INPUT_ERROR);
    await expect(page.locator(FORM_INPUT_ERROR_ICON).nth(1)).toBeVisible();

    await expect(page.locator(ERROR_MESSAGE_CONTAINER)).toBeVisible();
    await expect(page.locator(ERROR_MESSAGE_CONTAINER)).toHaveText(USERNAME_ERROR_MESSAGE);
}