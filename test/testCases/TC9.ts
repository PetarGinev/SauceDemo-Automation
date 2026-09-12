import { expect, Page } from "@playwright/test";
import {
    ID_USERNAME,
    ID_PASSWORD,
    STANDARD_USERNAME,
    STANDARD_PASSWORD,
    ID_LOGIN_BTN,
    FORM_INPUT_ERROR,
    FORM_INPUT_ERROR_ICON,
    ERROR_MESSAGE_CONTAINER,
    ERROR_MESSAGE,
    capitalizeLoginCredential
} from "../helpers/login";

/* TC9: Verify login is case-sensitive for the username.
* Test Steps:
1. Navigate to the the login page.
2. Enter Standard_User in the Username field.
3. Enter valid password in the Password field.
4. Click the Login button.

* Expected result:
1. Login page is displayed.
2. Username is entered successfully.
3. Password is entered successfully.
4. The user remains on the Login page. Both the Username and Password fields are highlighted in red, and the following error message is displayed: "Epic sadface: Username and password do not match any user in this service".
*/

export default async function (page: Page) {
    // 1 2 3
    await page.fill(ID_USERNAME, capitalizeLoginCredential(STANDARD_USERNAME));
    await page.fill(ID_PASSWORD, STANDARD_PASSWORD);

    // 4
    await page.locator(ID_LOGIN_BTN).click();

    await expect(page).toHaveURL("/");

    await expect(page.locator(ID_USERNAME)).toContainClass(FORM_INPUT_ERROR);
    await expect(page.locator(FORM_INPUT_ERROR_ICON).nth(0)).toBeVisible();

    await expect(page.locator(ID_PASSWORD)).toContainClass(FORM_INPUT_ERROR);
    await expect(page.locator(FORM_INPUT_ERROR_ICON).nth(1)).toBeVisible();

    await expect(page.locator(ERROR_MESSAGE_CONTAINER)).toBeVisible();
    await expect(page.locator(ERROR_MESSAGE_CONTAINER)).toHaveText(ERROR_MESSAGE);
}