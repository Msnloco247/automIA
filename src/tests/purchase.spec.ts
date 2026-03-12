import { test, expect } from '../fixtures/auth.fixture';
import { TEST_DATA } from '../data/testData';

test.describe('Purchase Flow Scenarios', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    // This fixture handles login automatically for each test in this block
  });

  test('Complete purchase successfully @positive', async ({ 
    inventoryPage, 
    cartPage, 
    checkoutInformationPage, 
    checkoutOverviewPage, 
    checkoutCompletePage 
  }) => {
    const itemName = TEST_DATA.PRODUCTS.BACKPACK;

    // 1. Select Product
    await inventoryPage.addItemToCart(itemName);
    await inventoryPage.navigateToCart();
    
    // 2. Cart Verification
    await cartPage.verifyItemInCart(itemName);
    await cartPage.clickCheckout();

    // 3. Fill Checkout Information
    await checkoutInformationPage.fillInformation(
      TEST_DATA.CHECKOUT_INFO.FIRST_NAME,
      TEST_DATA.CHECKOUT_INFO.LAST_NAME,
      TEST_DATA.CHECKOUT_INFO.POSTAL_CODE
    );
    await checkoutInformationPage.clickContinue();

    // 4. Final Overview
    await checkoutOverviewPage.verifyItemName(itemName);
    await checkoutOverviewPage.clickFinish();

    // 5. Success Verification
    const successMessage = await checkoutCompletePage.getSuccessMessage();
    expect(successMessage).toBe('Thank you for your order!');
  });

  test('Fails to checkout without first name @negative', async ({ 
    inventoryPage, 
    cartPage, 
    checkoutInformationPage 
  }) => {
    await inventoryPage.addItemToCart(TEST_DATA.PRODUCTS.BIKE_LIGHT);
    await inventoryPage.navigateToCart();
    await cartPage.clickCheckout();

    await checkoutInformationPage.fillInformation('', 'Doe', '12345');
    await checkoutInformationPage.clickContinue();

    const error = await checkoutInformationPage.getErrorMessageText();
    expect(error).toContain(TEST_DATA.ERROR_MESSAGES.CHECKOUT_FIRST_NAME);
  });

  test('Fails to checkout without last name @negative', async ({ 
    inventoryPage, 
    cartPage, 
    checkoutInformationPage 
  }) => {
    await inventoryPage.addItemToCart(TEST_DATA.PRODUCTS.BIKE_LIGHT);
    await inventoryPage.navigateToCart();
    await cartPage.clickCheckout();

    await checkoutInformationPage.fillInformation('John', '', '12345');
    await checkoutInformationPage.clickContinue();

    const error = await checkoutInformationPage.getErrorMessageText();
    expect(error).toContain(TEST_DATA.ERROR_MESSAGES.CHECKOUT_LAST_NAME);
  });

  test('Fails to checkout without postal code @negative', async ({ 
    inventoryPage, 
    cartPage, 
    checkoutInformationPage 
  }) => {
    await inventoryPage.addItemToCart(TEST_DATA.PRODUCTS.BIKE_LIGHT);
    await inventoryPage.navigateToCart();
    await cartPage.clickCheckout();

    await checkoutInformationPage.fillInformation('John', 'Doe', '');
    await checkoutInformationPage.clickContinue();

    const error = await checkoutInformationPage.getErrorMessageText();
    expect(error).toContain(TEST_DATA.ERROR_MESSAGES.CHECKOUT_POSTAL_CODE);
  });
});
