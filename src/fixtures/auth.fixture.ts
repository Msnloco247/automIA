import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { ENV } from '../config/env.config';

type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutInformationPage: CheckoutInformationPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
  authenticatedPage: void;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use, testInfo) => {
    await use(new LoginPage(page, testInfo.title));
  },
  inventoryPage: async ({ page }, use, testInfo) => {
    await use(new InventoryPage(page, testInfo.title));
  },
  cartPage: async ({ page }, use, testInfo) => {
    await use(new CartPage(page, testInfo.title));
  },
  checkoutInformationPage: async ({ page }, use, testInfo) => {
    await use(new CheckoutInformationPage(page, testInfo.title));
  },
  checkoutOverviewPage: async ({ page }, use, testInfo) => {
    await use(new CheckoutOverviewPage(page, testInfo.title));
  },
  checkoutCompletePage: async ({ page }, use, testInfo) => {
    await use(new CheckoutCompletePage(page, testInfo.title));
  },
  authenticatedPage: async ({ loginPage }, use) => {
    await loginPage.goto();
    await loginPage.login(ENV.USERNAME, ENV.PASSWORD);
    await use();
  }
});

export { expect } from '@playwright/test';
