import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page, testName?: string) {
    super(page, testName);
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
  }

  async verifyItemInCart(itemName: string) {
    const item = this.cartItems.filter({ hasText: itemName });
    await expect(item).toBeVisible();
  }

  async clickCheckout() {
    await this.click(this.checkoutButton, 'Checkout button');
  }
}
