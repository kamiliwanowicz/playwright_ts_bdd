import { Page } from "@playwright/test";

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

export function lastIndex(list: any[]): number {
  return list.length - 1;
}
