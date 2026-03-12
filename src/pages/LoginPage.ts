import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page, testName?: string) {
    super(page, testName);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.navigateTo('/');
  }

  async login(user: string, pass: string) {
    await this.fill(this.usernameInput, user, 'Username input');
    await this.fill(this.passwordInput, pass, 'Password input', true);
    await this.click(this.loginButton, 'Login button');
  }

  async getErrorMessageText(): Promise<string> {
    return await this.getElementText(this.errorMessage, 'Login error message');
  }
}
