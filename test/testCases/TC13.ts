import { expect, Page } from "@playwright/test";
import * as login from "../helpers/login";

/* TC13: Verify login behavior for all predefined users.
* Test Steps:
1. Navigate to the Login page.
2. Enter valid username in the Username field.
3. Enter the valid password in the Password field.
4. Click the Login button.
5. Repeat steps 1-4 for each predefined username.

* Expected result:
1. The Login page is displayed.
2. Username is entered successfully.
3. The password is entered successfully.
4. User is redirected to the Products page.
5. Each username produces the expected result. standard_user, problem_user, performance_glitch_user, error_user, and visual_user are successfully logged in. For locked_out_user, login is rejected, the user remains on the Login page, and the error message ""Epic sadface: Sorry, this user has been locked out."" is displayed.
*/

export default async function (page: Page) {
    const loginUsers = [
        {
            username: login.STANDARD_USERNAME,
            expectedUrl: /inventory/,
            expectedError: null
        },
        {
            username: login.LOCKED_OUT_USER,
            expectedUrl: null,
            expectedError: login.LOCKED_OUT_USER_ERROR_MESSAGE
        },
        {
            username: login.PROBLEM_USER,
            expectedUrl: /inventory/,
            expectedError: null
        },
        {
            username: login.PERFOMANCE_GLITCH_USER,
            expectedUrl: /inventory/,
            expectedError: null
        },
        {
            username: login.ERROR_USER,
            expectedUrl: /inventory/,
            expectedError: null
        },
        {
            username: login.VISUAL_USER,
            expectedUrl: /inventory/,
            expectedError: null
        }
    ];

    // 1 2 3 4 5
    for (const user of loginUsers) {
        await page.fill(login.ID_USERNAME, user.username);
        await page.fill(login.ID_PASSWORD, login.STANDARD_PASSWORD);

        await page.locator(login.ID_LOGIN_BTN).click();

        if (user.expectedUrl) {
            await expect(page).toHaveURL(user.expectedUrl);
            await page.goto('/');
            await expect(page).toHaveURL('/');
        }

        if (user.expectedError) {
            await expect(page.locator(login.ID_USERNAME)).toContainClass(login.FORM_INPUT_ERROR);
            await expect(page.locator(login.FORM_INPUT_ERROR_ICON).nth(0)).toBeVisible();
        
            await expect(page.locator(login.ID_PASSWORD)).toContainClass(login.FORM_INPUT_ERROR);
            await expect(page.locator(login.FORM_INPUT_ERROR_ICON).nth(1)).toBeVisible();
        
            await expect(page.locator(login.ERROR_MESSAGE_CONTAINER)).toBeVisible();
            await expect(page.locator(login.ERROR_MESSAGE_CONTAINER)).toHaveText(user.expectedError);
        }
    }
}