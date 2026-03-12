import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page, testName?: string) {
    super(page, testName);
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addItemToCart(itemName: string) {
    const formattedName = itemName.toLowerCase().replace(/\s+/g, '-');
    const addToCartButton = this.page.locator(`[data-test="add-to-cart-${formattedName}"]`);
    await this.click(addToCartButton, `Add to cart button for ${itemName}`);
  }

  async navigateToCart() {
    await this.click(this.cartLink, 'Shopping cart link');
  }
}
