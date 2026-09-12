import { expect, Page } from "@playwright/test";
import { ID_USERNAME, ID_PASSWORD, login, logout } from "../helpers/login";

/* TC14: Verify the user is redirected to the Login page after logout.
* Test Steps:
1. Navigate to the the login page.
2. Enter valid username in the Username field.
3. Enter valid password in the Password field.
4. Click the Login button.
5. Logout from the application.
6. Verify that the Username and Password fields are empty.

* Expected result:
1. Login page is displayed.
2. Username is entered successfully.
3. Password is entered successfully.
4. User is redirected to the Products page.
5. User is redirected to the Login page.
6. Username and Password fields are empty.
*/

export default async function (page: Page) {
    // 1 2 3 4 5
    await login(page);
    await logout(page);

    // 6
    const username = await page.locator(ID_USERNAME).inputValue();
    const password = await page.locator(ID_PASSWORD).inputValue();
    expect(username).toBe("");
    expect(password).toBe("");
}