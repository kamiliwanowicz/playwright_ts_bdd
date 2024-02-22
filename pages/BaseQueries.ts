import { Locator, Page } from "@playwright/test";
import fs from "fs";

export class BaseQueries {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkIfElementPresent(locator: string): Promise<boolean> {
    if ((await this.page.locator(locator).count()) > 0) {
      return true;
    }
    return false;
  }
}
