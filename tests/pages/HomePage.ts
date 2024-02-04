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
  private readonly accessoriesShopAll: Locator;
  private readonly accessoriesNewReleases: Locator;
  private readonly itemsList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookies = page.locator("#onetrust-accept-btn-handler");
    this.mainMenu = page.locator("button[aria-label='Main menu']");
    this.menCategory = page.locator("span#men");
    this.womenCategory = page.locator('[aria-controls="panel-women"]');
    this.accessoriesCategory = page.locator(
      '[aria-controls="panel-accessories"]'
    );
    this.menNewReleases = page.locator(
      ".undefined + a[href='https://www.gymshark.com/collections/new-releases/mens']"
    );
    this.womenNewReleases = page.locator(
      "a[href='https://uk.shop.gymshark.com/collections/new-releases/womens'] h3"
    );
    this.accessoriesShopAll = page.locator(
      "button[data-locator-id=navigation-subCategories-shop_all-read]"
    );
    this.accessoriesNewReleases = page.locator(
      "section[id='panel-accessories'] a[title='New Releases']"
    );
    this.itemsList = page.locator('*[class^="product-grid_grid"]');
  }

  async goToHomepage() {
    await this.page.goto(this.url_);
    return this;
  }

  async clickAcceptCookies() {
    await this.acceptCookies.click();
    return this;
  }

  async openMainMenu() {
    await this.mainMenu.click();
    return this;
  }

  async goToMen() {
    await this.menCategory.click();
    return this;
  }

  async clickMensNewReleases() {
    await this.menNewReleases.click();
    return this;
  }

  async goToMensNewReleases() {
    await this.goToHomepage();
    await this.clickAcceptCookies();
    await this.goToMen();
    await this.clickMensNewReleases();
    return this;
  }
}
