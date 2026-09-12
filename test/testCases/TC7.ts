import { expect, Page } from "@playwright/test";
import {
    ID_USERNAME,
    ID_PASSWORD,
    STANDARD_USERNAME,
    ID_LOGIN_BTN,
    FORM_INPUT_ERROR,
    FORM_INPUT_ERROR_ICON,
    ERROR_MESSAGE_CONTAINER,
    PASSWORD_ERROR_MESSAGE
} from "../helpers/login";

/* TC7: Verify login with empty password
* Test Steps:
1. Navigate to the login page.
2. Enter valid username in the Username field.
3. Leave the Password field empty.
4. Click the Login button.

* Expected result:
1. Login page is displayed.
2. Username is entered successfully.
3. Password field is empty.
4. The user remains on the Login page. Both the Username and Password fields are highlighted in red, and the following error message is displayed: "Epic sadface: Password is required".
*/

export default async function (page: Page) {
    // 1 2 3
    await page.fill(ID_USERNAME, STANDARD_USERNAME);

    // 4
    await page.locator(ID_LOGIN_BTN).click();

    await expect(page).toHaveURL("/");

    await expect(page.locator(ID_USERNAME)).toContainClass(FORM_INPUT_ERROR);
    await expect(page.locator(FORM_INPUT_ERROR_ICON).nth(0)).toBeVisible();

    await expect(page.locator(ID_PASSWORD)).toContainClass(FORM_INPUT_ERROR);
    await expect(page.locator(FORM_INPUT_ERROR_ICON).nth(1)).toBeVisible();

    await expect(page.locator(ERROR_MESSAGE_CONTAINER)).toBeVisible();
    await expect(page.locator(ERROR_MESSAGE_CONTAINER)).toHaveText(PASSWORD_ERROR_MESSAGE);
}