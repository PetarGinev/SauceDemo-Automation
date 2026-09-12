import { expect, Page } from "@playwright/test";
import * as login from "../helpers/login";

/* TC12: Verify that all login page elements are visible.
* Test Steps:
1. Navigate to the the login page.
2. Verify that all login page elements are visible.

* Expected result:
1. Login page is displayed.
2. All login page elements are displayed. The login logo, Username field, Password field, Login button and Accepted usernames/password section are visible. The Username and Password fields are enabled and display their placeholder text.
*/

export default async function (page: Page) {
    const loginElements = [
    login.LOGIN_LOGO,
    login.ID_USERNAME,
    login.ID_PASSWORD,
    login.ID_LOGIN_BTN,
    login.LOGIN_CREDENTIALS_CONTAINER,
    login.ACCEPTED_USERNAMES,
    login.ACCEPTED_PASSWORDS
    ];
    const usernames = [
        login.STANDARD_USERNAME,
        login.LOCKED_OUT_USER,
        login.PROBLEM_USER,
        login.PERFOMANCE_GLITCH_USER,
        login.ERROR_USER,
        login.VISUAL_USER
    ];

    // 1 2
    for (const element of loginElements) {
        await expect(page.locator(element)).toBeEnabled();
        await expect(page.locator(element)).toBeVisible();
    }

    expect(await page.locator(login.LOGIN_LOGO).innerText()).toContain("Swag Labs");

    await expect(page.locator(login.ID_USERNAME)).toHaveAttribute("placeholder", "Username");
    await expect(page.locator(login.ID_PASSWORD)).toHaveAttribute("placeholder", "Password");

    for (const username of usernames) {
        await expect(page.locator(login.ACCEPTED_USERNAMES)).toContainText(username);
    }

    await expect(page.locator(login.ACCEPTED_PASSWORDS)).toContainText(login.STANDARD_PASSWORD);
}