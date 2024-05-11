import { Locator, Page, expect } from "@playwright/test";
import { browserType } from "../frontend-E2E/TestConfig";

export class HomePage {
  constructor(private page: Page) {}

  url_ = "https://www.gymshark.com/";
  acceptCookies: Locator = this.page.locator("#onetrust-accept-btn-handler");
  mainMenu: Locator = this.page.locator("button[aria-label='Main menu']");
  menCategory = this.page.locator("span#men");
  womenCategory = this.page.getByRole("link", { name: "women", exact: true });
  accessoriesCategory = this.page.locator('[data-locator-id="navigation-desktopLink-accessories-select"]');
  menNewReleases: Locator = this.page.locator(
    ".undefined + a[href='https://www.gymshark.com/collections/new-releases/mens']"
  );
  womenNewReleases: Locator = this.page
    .locator('[id="panel-women\\ "]')
    .getByRole("link", { name: "New Releases" });
  accessoriesNewReleasesHoverMenuOption: Locator = this.page
    .locator("#panel-accessories")
    .getByRole("link", { name: "New Releases" });
  hamburgerMenu: Locator = this.page.locator("button[data-locator-id=navigation-burgerMenu-select]");
  saleTrending: Locator = this.page.locator(
    "button[data-locator-id=navigation-subCategories-sale_trending-read]"
  );

  async goToHomepage() {
    await this.page.goto(this.url_);
  }

  async clickAcceptCookies() {
    await expect(this.acceptCookies).toBeVisible();
    await this.acceptCookies.click();
    await expect(this.acceptCookies).not.toBeVisible();
  }

  async openMainMenu() {
    await this.mainMenu.click();
  }

  async goToMenNewReleases() {
    await this.menCategory.click();
    await this.menNewReleases.click();
  }

  async goToWomenNewReleases() {
    await this.womenCategory.hover();
    await this.womenNewReleases.click();
  }

  async goToAccessoriesNewReleases() {
    await this.accessoriesCategory.hover();
    await this.accessoriesNewReleasesHoverMenuOption.click();
  }

  async clickHamburgerMenu() {
    await this.hamburgerMenu.click();
  }

  async clickSaleTrending() {
    await this.saleTrending.click();
  }

  async goToNewReleases(type: string) {
    await this.goToHomepage();
    await this.clickAcceptCookies();

    if (browserType.includes("Pixel") || browserType.includes("iPhone")) {
      await this.clickHamburgerMenu();
      await this.clickSaleTrending();
    }
    if (type === "Men") {
      await this.goToMenNewReleases();
    } else if (type === "Women") {
      await this.goToWomenNewReleases();
    } else if (type === "Accessories") {
      await this.goToAccessoriesNewReleases();
    } else {
      throw new Error(
        `Please provide one of the following types: Men, Women, Accessories. Type provided: ${type}`
      );
    }
  }
}
