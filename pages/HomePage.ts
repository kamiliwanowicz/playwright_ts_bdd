import { Locator, Page, expect } from "@playwright/test";
import { browserType } from "../frontend-E2E/TestConfig";

export class HomePage {
  readonly page: Page;
  private readonly url_ = "https://www.gymshark.com/";
  private readonly acceptCookies: Locator;
  private readonly mainMenu: Locator;
  private readonly menCategory: Locator;
  private readonly womenCategory: Locator;
  private readonly accessoriesCategory: Locator;
  private readonly menNewReleases: Locator;
  private readonly womenNewReleases: Locator;
  private readonly accessoriesNewReleasesHoverMenuOption: Locator;
  private readonly itemsList: Locator;
  private readonly hamburgerMenu: Locator;
  private readonly saleTrending: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookies = page.locator("#onetrust-accept-btn-handler");
    this.mainMenu = page.locator("button[aria-label='Main menu']");
    this.menCategory = page.getByRole("link", { name: "men's sale", exact: true });
    this.womenCategory = page.getByRole("link", { name: "women's sale", exact: true });
    this.accessoriesCategory = page.getByRole("link", { name: "accessories sale", exact: true });
    this.menNewReleases = page.locator(
      ".undefined + a[href='https://www.gymshark.com/collections/new-releases/mens']"
    );
    this.womenNewReleases = page.getByRole("link", { name: "SHOP NEW" });
    this.accessoriesNewReleasesHoverMenuOption = page
      .locator("#panel-accessories")
      .getByRole("link", { name: "New Releases" });
    this.itemsList = page.locator('*[class^="product-grid_grid"]');
    this.hamburgerMenu = page.locator("button[data-locator-id=navigation-burgerMenu-select]");
    this.saleTrending = page.locator("button[data-locator-id=navigation-subCategories-sale_trending-read]");
  }

  async goToHomepage() {
    await this.page.goto(this.url_);
  }

  async clickAcceptCookies() {
    expect(await this.acceptCookies).toBeVisible();
    await this.acceptCookies.click();
    expect(await this.acceptCookies).not.toBeVisible();
  }

  async openMainMenu() {
    await this.mainMenu.click();
  }

  async goToMenNewReleases() {
    await this.menCategory.click();
    await this.menNewReleases.click();
  }

  async goToWomenNewReleases() {
    await this.womenCategory.click();
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
