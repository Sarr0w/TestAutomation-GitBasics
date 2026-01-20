# AI Coding Agent Instructions

## Project Overview
This is a **Playwright test automation** project for QA testing. It contains end-to-end (E2E) test specs using Playwright's test framework. The project targets external web applications (e.g., Playwright documentation, The Internet test sites) rather than a local application.

## Architecture & Key Patterns

### Test Structure
- **Single test directory**: All tests live in `tests/` folder (see [tests/example.spec.ts](tests/example.spec.ts))
- **Test file naming**: Use `.spec.ts` suffix for test files
- **Test organization**: Tests are grouped using `test('description', async ({page}) => {...})` 
- **No Page Object Model (POM) yet**: Tests directly use Playwright locators (e.g., `page.getByRole()`, `page.getByText()`)

### Test Patterns (from [tests/example.spec.ts](tests/example.spec.ts))
```typescript
// Use getByRole for form elements - most reliable
await page.getByRole('button', { name: 'Login' }).click();
await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');

// Use getByText for verifying content
await expect(page.getByText('You logged into a secure area!')).toBeVisible();

// Navigate to external sites (no local baseURL configured)
await page.goto('https://the-internet.herokuapp.com');
```

## Critical Workflows

### Running Tests
- **UI Mode (interactive debugging)**: `npx playwright test --ui --headed` - launches Playwright Inspector for step-by-step debugging
- **Headless (CI-like)**: `npx playwright test` - runs all tests without UI
- **Single test file**: `npx playwright test tests/example.spec.ts`
- **Specific test**: `npx playwright test -g "successful login"`

### Test Reports
- **HTML Report**: Generated in `playwright-report/` after test runs
- View with: `npx playwright show-report`

### CI Configuration
- **Parallel disabled on CI**: Tests run sequentially (1 worker) to prevent flakiness
- **Retries on CI only**: 2 retries on CI, 0 locally
- **forbidOnly**: CI fails if `test.only` is left in code (line 17 of config)

## Configuration Details

### [playwright.config.ts](playwright.config.ts)
- **fullyParallel**: true (local development runs tests in parallel)
- **projects**: chromium, firefox (webkit & mobile configs commented out)
- **trace**: 'on-first-retry' (captures trace on first retry failure)
- **reporter**: 'html' (generates HTML report)
- **No baseURL set** - tests explicitly navigate to full URLs

### [package.json](package.json)
- **@playwright/test**: ^1.57.0
- **@types/node**: ^25.0.9
- No npm scripts defined yet - use `npx playwright` commands directly

## Common Tasks & Conventions

### Adding New Tests
1. Create new test block in [tests/example.spec.ts](tests/example.spec.ts) or new `.spec.ts` file
2. Use `getByRole()` as primary locator strategy (accessibility-first)
3. Include meaningful test names and assertions
4. Example: `test('successful login', async ({page}) => { ... })`

### Debugging Failed Tests
1. Run with `--ui --headed` for interactive stepping
2. Check `test-results/` directory for screenshots/videos of failures
3. Review `playwright-report/index.html` for detailed test report
4. Use trace viewer: `npx playwright show-trace` if trace captured

### Adding External Test Sites
- No local server required - update `page.goto()` with new URL
- Example pattern: `await page.goto('https://example.com'); await page.getByRole(...)`

## Exclusions & Ignored Paths
- **Ignored in git**: `test-results/`, `playwright-report/`, `blob-report/`, `node_modules/`
- These are generated outputs, not source code

## Notes for AI Agents
- Tests are **state-independent** - each test navigates to fresh URLs with fresh page context
- No authentication fixtures or shared state currently configured
- Focus on **accessibility-first locators** (getByRole, getByLabel) rather than CSS selectors
- When modifying tests, preserve the pattern of: navigate → interact → assert
