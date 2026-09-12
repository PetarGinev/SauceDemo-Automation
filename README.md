# Playwright TypeScript SauceDemo Automation

UI test automation framework built with **Playwright** and **TypeScript**, focused on functional and authentication testing of the SauceDemo web application.

The project is designed as a portfolio automation framework demonstrating practical QA automation skills, including reusable test helpers, structured test cases, data-driven scenarios, assertions, test isolation, and CI execution with GitHub Actions.

---

## Tech Stack

* **Playwright** – browser automation and end-to-end testing
* **TypeScript** – strongly typed test implementation
* **Node.js** – runtime and package management
* **ESLint** – code quality and consistency
* **dotenv** – environment configuration
* **Git & GitHub** – source control
* **GitHub Actions** – CI test execution

---

## Project Structure

```text
SauceDemo-Automation/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── test/
│   ├── helpers/
│   │   ├── cart.ts
│   │   ├── inventory.ts
│   │   └── login.ts
│   │
│   ├── testCases/
│   │   ├── TC1.ts
│   │   ├── TC2.ts
│   │   ├── ...
│   │   └── TC18.ts
│   │
│   └── login.spec.ts
│
├── .env
├── .gitignore
├── eslint.config.mts
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

### Structure overview

**`test/login.spec.ts`**

Main Playwright test file that defines and executes the test scenarios.

**`test/testCases/`**

Contains individual test case implementations. Each test case is kept isolated in its own file, making the scenarios easier to maintain and extend.

**`test/helpers/`**

Contains reusable functionality shared between test cases, such as login, inventory and cart operations.

**`.github/workflows/`**

Contains the GitHub Actions workflow used to execute the automated test suite in CI.

---

## Test Coverage

The current automation suite focuses primarily on **Login and Authentication** functionality.

### Authentication & Login

The suite currently covers:

* Successful login with valid credentials
* Login using the `Enter` key
* Invalid username
* Invalid password
* Invalid username and password
* Empty username
* Empty password
* Empty username and password
* Username case sensitivity
* Password case sensitivity
* Password field masking
* Login page UI elements
* Login behavior for predefined users
* Logout and redirection to the Login page
* Successful login after an unsuccessful login attempt
* Authentication persistence after page refresh
* Authentication persistence while navigating between application pages
* Protected Inventory route access without authentication

This provides coverage of both **positive and negative authentication scenarios**, as well as authentication state and protected-route behavior.

---

## Testing Approach

The framework follows several principles commonly used in maintainable UI automation projects.

### Reusable Helpers

Common application actions are extracted into reusable helper functions instead of being duplicated across test cases.

For example, the login functionality can be reused across multiple scenarios while still allowing custom credentials when required.

### Independent Test Cases

Each test case is designed to establish the required application state independently.

This helps prevent one test from relying on the result or state of another test and makes failures easier to diagnose.

### Positive & Negative Testing

The suite includes both successful and unsuccessful authentication scenarios.

Examples include:

* Valid credentials
* Invalid credentials
* Missing credentials
* Case-sensitive credentials
* Locked or predefined users
* Authentication persistence

### Data-Driven Testing

Where multiple input combinations represent the same functional behavior, test data can be used to execute the scenario against different credential combinations.

This reduces duplicated test logic while increasing coverage.

### Explicit Assertions

Assertions are used to verify application behavior rather than simply performing UI actions.

Examples include:

* URL validation
* Error message validation
* Visibility checks
* Input state validation
* Authentication state validation
* Successful navigation

---

## Example Authentication Scenario

One of the implemented scenarios verifies that an authenticated user remains logged in after refreshing the page.

The test:

1. Opens the Login page.
2. Logs in using valid credentials.
3. Verifies successful navigation to the Inventory page.
4. Refreshes the page.
5. Verifies that the user remains authenticated.
6. Verifies that authenticated-only UI elements are still available.

This validates both the URL state and the authenticated application state.

---

## Configuration

Playwright configuration is centralized in:

```text
playwright.config.ts
```

The configuration controls the execution environment and test behavior, including CI-specific settings.

The project also uses environment variables through `.env` where configuration values should not be hardcoded directly into the test implementation.

---

## Running the Tests

### Install dependencies

```bash
npm ci
```

### Install Playwright browsers

```bash
npx playwright install
```

### Run the complete test suite

```bash
npx playwright test
```

### Run tests in headed mode

```bash
npx playwright test --headed
```

### Run a specific test file

```bash
npx playwright test test/login.spec.ts
```

### Run tests using the Playwright UI mode

```bash
npx playwright test --ui
```

---

## Code Quality

ESLint is configured to help maintain consistent and readable TypeScript code.

Run linting with:

```bash
npm run lint
```

Automatically fix supported linting issues with:

```bash
npm run lint:fix
```

---

## CI/CD

The project includes a **GitHub Actions** workflow for automated test execution.

The CI pipeline:

1. Checks out the repository.
2. Sets up Node.js.
3. Installs project dependencies.
4. Installs Playwright browsers and required dependencies.
5. Executes the Playwright test suite.
6. Uploads the Playwright HTML report as a workflow artifact.

This allows the test suite to be executed automatically on repository changes and pull requests.

---

## Test Reporting

After test execution, Playwright generates an HTML report that can be used to investigate:

* Passed tests
* Failed tests
* Test duration
* Execution steps
* Failure details
* Screenshots and other available test artifacts

The CI workflow also preserves the generated Playwright report as a GitHub Actions artifact.

---

## Design Goals

The main goals of this project are:

* Build a maintainable Playwright automation framework
* Practice real-world UI automation patterns
* Keep test cases readable and independent
* Minimize duplicated test logic
* Create reusable application helpers
* Cover both positive and negative scenarios
* Validate authentication and session behavior
* Integrate automated tests into CI
* Demonstrate practical QA Automation skills

---

## Future Improvements

Potential future improvements include:

* Expanding Inventory test coverage
* Expanding Cart test coverage
* Adding Checkout test coverage
* Increasing reusable Page Object coverage where appropriate
* Improving test data management
* Adding more cross-browser execution
* Adding additional CI checks
* Improving test reporting and failure diagnostics

---

## Project Status

The framework is actively being developed and extended with additional functional scenarios.

The current focus is on building a clean foundation for scalable UI automation while maintaining readable and independent test cases.

---

## Author

**Petar Ginev**

QA Automation portfolio project built with Playwright and TypeScript.
