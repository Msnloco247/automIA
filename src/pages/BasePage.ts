import { Page, Locator, expect, test } from '@playwright/test';
import { logStep, logInfo, logError } from '../utils/logger';

export class BasePage {
  readonly page: Page;
  readonly testName: string;

  constructor(page: Page, testName: string = '') {
    this.page = page;
    this.testName = testName;
  }

  async navigateTo(path: string = '/') {
    await test.step(`Navigate to ${path}`, async () => {
      logStep(`Navigating to ${path}`, this.testName);
      try {
        await this.page.goto(path);
        logInfo(`Successfully navigated to ${path}`, this.testName);
      } catch (error) {
        logError(`Failed to navigate to ${path}`, this.testName, error);
        throw error;
      }
    });
  }

  async click(locator: Locator, description: string) {
    await test.step(`Click on ${description}`, async () => {
      logStep(`Clicking on ${description}`, this.testName);
      try {
        await locator.click();
        logInfo(`Successfully clicked on ${description}`, this.testName);
      } catch (error) {
        logError(`Failed to click on ${description}`, this.testName, error);
        throw error;
      }
    });
  }

  async fill(locator: Locator, text: string, description: string, isSensitive: boolean = false) {
    const logText = isSensitive ? '******' : text;
    await test.step(`Fill ${description} with ${logText}`, async () => {
      logStep(`Filling ${description} with: ${logText}`, this.testName);
      try {
        await locator.fill(text);
        logInfo(`Successfully filled ${description}`, this.testName);
      } catch (error) {
        logError(`Failed to fill ${description}`, this.testName, error);
        throw error;
      }
    });
  }

  async getElementText(locator: Locator, description: string): Promise<string> {
    return await test.step(`Get text from ${description}`, async () => {
      logStep(`Getting text from ${description}`, this.testName);
      try {
        const text = await locator.innerText();
        logInfo(`Successfully got text from ${description}: ${text}`, this.testName);
        return text;
      } catch (error) {
        logError(`Failed to get text from ${description}`, this.testName, error);
        throw error;
      }
    });
  }

  async isVisible(locator: Locator, description: string): Promise<boolean> {
    return await test.step(`Check if ${description} is visible`, async () => {
      logStep(`Checking if ${description} is visible`, this.testName);
      const visible = await locator.isVisible();
      if (visible) {
        logInfo(`${description} is visible`, this.testName);
      } else {
        logInfo(`${description} is not visible`, this.testName);
      }
      return visible;
    });
  }

  async verifyUrl(url: string | RegExp) {
    await test.step(`Verify URL matches ${url}`, async () => {
      logStep(`Verifying URL matches: ${url}`, this.testName);
      await expect(this.page).toHaveURL(url);
      logInfo(`URL matches: ${url}`, this.testName);
    });
  }
}
