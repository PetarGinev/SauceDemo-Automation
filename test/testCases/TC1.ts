import { Page } from "@playwright/test";
import { login } from "../helpers/login";

/* TC1: Verify successful login with valid standard_user credentials.
* Test Steps:
1. Navigate to the the login page.
2. Enter valid username in the Username field.
3. Enter valid password in the Password field.
4. Click the Login button.

* Expected result:
1. Login page is displayed.
2. Username is entered successfully.
3. Password is entered successfully.
4. User is redirected to the Products page.
*/

export default async function (page: Page) {
    // 1-4
    await login(page);
}