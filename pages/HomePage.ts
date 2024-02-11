import { Locator, Page } from "@playwright/test";

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

  constructor(page: Page) {
    this.page = page;
    this.acceptCookies = page.locator("#onetrust-accept-btn-handler");
    this.mainMenu = page.locator("button[aria-label='Main menu']");
    this.menCategory = page.locator("span#men");
    this.womenCategory = page.locator("#women");
    this.accessoriesCategory = page.locator(
      '[data-locator-id="navigation-desktopLink-accessories-select"]'
    );
    this.menNewReleases = page.locator(
      ".undefined + a[href='https://www.gymshark.com/collections/new-releases/mens']"
    );
    this.womenNewReleases = page.getByRole("link", { name: "SHOP NEW" });
    this.accessoriesNewReleasesHoverMenuOption = page
      .locator("#panel-accessories")
      .getByRole("link", { name: "New Releases" });
    this.itemsList = page.locator('*[class^="product-grid_grid"]');
  }

  async goToHomepage() {
    await this.page.goto(this.url_);
  }

  async clickAcceptCookies() {
    await this.acceptCookies.click();
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

  async goToNewReleases(type: string) {
    const homePage = new HomePage(this.page);
    await homePage.goToHomepage();
    await homePage.clickAcceptCookies();

    if (type === "Men") {
      await homePage.goToMenNewReleases();
    } else if (type === "Women") {
      await homePage.goToWomenNewReleases();
    } else if (type === "Accessories") {
      await homePage.goToAccessoriesNewReleases();
    } else {
      throw new Error(
        `Please provide one of the following types: Men, Women, Accessories. Type provided: ${type}`
      );
    }
  }

  // async goToMensNewReleases(type: string) {
  //   const homePage = new HomePage(this.page);
  //   await homePage.goToHomepage();
  //   await homePage.clickAcceptCookies();
  //   await homePage.goToTypeOfNewReleases(type);

  //   // await homePage.goToMen();
  //   // await homePage.clickMensNewReleases();
  // }
}
