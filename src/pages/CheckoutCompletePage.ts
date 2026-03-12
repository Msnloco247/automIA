import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
  readonly successHeader: Locator;

  constructor(page: Page, testName?: string) {
    super(page, testName);
    this.successHeader = page.locator('[data-test="complete-header"]');
  }

  async getSuccessMessage(): Promise<string> {
    return await this.getElementText(this.successHeader, 'Success header');
  }
}
