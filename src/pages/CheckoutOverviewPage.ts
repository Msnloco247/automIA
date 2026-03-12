import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutOverviewPage extends BasePage {
  readonly finishButton: Locator;
  readonly itemName: Locator;

  constructor(page: Page, testName?: string) {
    super(page, testName);
    this.finishButton = page.locator('[data-test="finish"]');
    this.itemName = page.locator('[data-test="inventory-item-name"]');
  }

  async verifyItemName(name: string) {
    await this.getElementText(this.itemName.filter({ hasText: name }), `Inventory item ${name}`);
  }

  async clickFinish() {
    await this.click(this.finishButton, 'Finish button');
  }
}
