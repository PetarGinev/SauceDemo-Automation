import { expect, Page } from "@playwright/test";
import * as login from "../helpers/login";

/* TC15: Verify user can successfully log in with correct credentials after an unsuccessful login attempt.
* Test Steps:
1. Navigate to the the login page.
2. Enter invalid credentials for Username or Password fields.
3. Click the Login button.
4. Empty the Username and Password fields.
5. Enter valid username and password in the Username and Password fields.
6. Click the Login button.

* Expected result:
1. Login page is displayed.
2. Invalid credentials for Username or Password fields are entered.
3. The user remains on the Login page. Both the Username and Password fields are highlighted in red, and error message is displayed.
4. Username or Password fields are empty.
5. Username and Password are entered successfully.
6. User is redirected to the Products page.
*/

export default async function (page: Page) {
    let isUserLoggedIn = false;
    const loginScenarios = [
        {
            scenarioName: "empty username and password",
            username: "",
            password: "",
            expectedError: login.USERNAME_ERROR_MESSAGE,
        },
        {
            scenarioName: "empty username",
            username: "",
            password: login.STANDARD_PASSWORD,
            expectedError: login.USERNAME_ERROR_MESSAGE,
        },
        {
            scenarioName: "empty password",
            username: login.STANDARD_USERNAME,
            password: "",
            expectedError: login.PASSWORD_ERROR_MESSAGE,
        },
        {
            scenarioName: "correct username and wrong password",
            username: login.STANDARD_USERNAME,
            password: "wrongPassword",
            expectedError: login.ERROR_MESSAGE,
        },
        {
            scenarioName: "wrong username and correct password",
            username: "wrongUsername",
            password: login.STANDARD_PASSWORD,
            expectedError: login.ERROR_MESSAGE,
        },
        {
            scenarioName: "wrong username and password",
            username: "wrongUsername",
            password: "wrongPassword",
            expectedError: login.ERROR_MESSAGE,
        },
    ];

    // 1-6
    for (const user of loginScenarios) {
        if (isUserLoggedIn) {
            await login.logout(page);
        }

        console.log(`Login attempt with ${user.scenarioName}`)
        await page.locator(login.ID_USERNAME).fill(user.username);
        await page.locator(login.ID_PASSWORD).fill(user.password);
        await page.locator(login.ID_LOGIN_BTN).click();

        await expect(page.locator(login.ID_USERNAME)).toContainClass(login.FORM_INPUT_ERROR);
        await expect(page.locator(login.FORM_INPUT_ERROR_ICON).nth(0)).toBeVisible();

        await expect(page.locator(login.ID_PASSWORD)).toContainClass(login.FORM_INPUT_ERROR);
        await expect(page.locator(login.FORM_INPUT_ERROR_ICON).nth(1)).toBeVisible();

        await expect(page.locator(login.ERROR_MESSAGE_CONTAINER)).toBeVisible();
        await expect(page.locator(login.ERROR_MESSAGE_CONTAINER)).toHaveText(user.expectedError);

        await expect(page).toHaveURL("/");

        await login.login(page);
        isUserLoggedIn = true;
    }
};