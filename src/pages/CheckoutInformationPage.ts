import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutInformationPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page, testName?: string) {
    super(page, testName);
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async fillInformation(first: string, last: string, zip: string) {
    await this.fill(this.firstNameInput, first, 'First name');
    await this.fill(this.lastNameInput, last, 'Last name');
    await this.fill(this.postalCodeInput, zip, 'Postal code');
  }

  async clickContinue() {
    await this.click(this.continueButton, 'Continue button');
  }

  async getErrorMessageText(): Promise<string> {
    return await this.getElementText(this.errorMessage, 'Checkout error message');
  }
}
