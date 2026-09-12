import { test } from "@playwright/test";
import TC1 from "./testCases/TC1";
import TC2 from "./testCases/TC2";
import TC3 from "./testCases/TC3";
import TC4 from "./testCases/TC4";
import TC5 from "./testCases/TC5";
import TC6 from "./testCases/TC6";
import TC7 from "./testCases/TC7";
import TC8 from "./testCases/TC8";
import TC9 from "./testCases/TC9";
import TC10 from "./testCases/TC10";
import TC11 from "./testCases/TC11";
import TC12 from "./testCases/TC12";
import TC13 from "./testCases/TC13";
import TC14 from "./testCases/TC14";
import TC15 from "./testCases/TC15";
import TC16 from "./testCases/TC16";
import TC17 from "./testCases/TC17";
import TC18 from "./testCases/TC18";

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Login page test suite', () => {
  test("TC1: Verify successful login with valid standard_user credentials", async ({page}) => {
      await TC1(page);
  });
  
  test("TC2: Verify the Login button can be activated using the Enter key", async ({page}) => {
      await TC2(page);
  });
  
  test("TC3: Verify login with valid username and invalid password", async ({page}) => {
      await TC3(page);
  });
  
  test("TC4: Verify login with invalid username and valid password", async ({page}) => {
      await TC4(page);
  });
  
  test("TC5: Verify login with invalid username and invalid password", async ({page}) => {
      await TC5(page);
  });
  
  test("TC6: Verify login with empty username", async ({page}) => {
      await TC6(page);
  });
  
  test("TC7: Verify login with empty password", async ({page}) => {
      await TC7(page);
  });
  
  test("TC8: Verify login with both username and password empty", async ({page}) => {
      await TC8(page);
  });
  
  test("TC9: Verify login is case-sensitive for the username", async ({page}) => {
      await TC9(page);
  });
  
  test("TC10: Verify login is case-sensitive for the password", async ({page}) => {
      await TC10(page);
  });
  
  test("TC11: Verify the Password field masks entered characters", async ({page}) => {
      await TC11(page);
  });
  
  test("TC12: Verify that all login page elements are visible", async ({page}) => {
      await TC12(page);
  });
  
  test("TC13: Verify login behavior for all predefined users", async ({page}) => {
      await TC13(page);
  });
  
  test("TC14: Verify the user is redirected to the Login page after logout", async ({page}) => {
      await TC14(page);
  });
  
  test("TC15: Verify user can successfully log in with correct credentials after an unsuccessful login attempt", async ({page}) => {
      await TC15(page);
  });
  
  test("TC16: Verify that the authenticated user remains logged in after refreshing the page", async ({page}) => {
      await TC16(page);
  });
  
  test("TC17: Verify that the user remains logged in when navigating between application pages", async ({page}) => {
      await TC17(page);
  });
  
  test("TC18: Verify direct access to the Inventory page without authentication redirects to the Login page", async ({page}) => {
      await TC18(page);
  });
});
