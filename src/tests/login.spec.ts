import { test, expect } from '../fixtures/auth.fixture';
import { ENV } from '../config/env.config';
import { TEST_DATA } from '../data/testData';

test.describe('Login Scenarios', () => {
  test('Successful login @positive', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(ENV.USERNAME, ENV.PASSWORD);
    await loginPage.verifyUrl(/inventory.html/);
  });

  test('Login with locked out user @negative', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(ENV.LOCKED_OUT_USER, ENV.PASSWORD);
    const error = await loginPage.getErrorMessageText();
    expect(error).toContain(TEST_DATA.ERROR_MESSAGES.LOCKED_OUT);
  });

  test('Login with empty username @negative', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('', ENV.PASSWORD);
    const error = await loginPage.getErrorMessageText();
    expect(error).toContain(TEST_DATA.ERROR_MESSAGES.REQUIRED_USER);
  });

  test('Login with empty password @negative', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(ENV.USERNAME, '');
    const error = await loginPage.getErrorMessageText();
    expect(error).toContain(TEST_DATA.ERROR_MESSAGES.REQUIRED_PASS);
  });
});
