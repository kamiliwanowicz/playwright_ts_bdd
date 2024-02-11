import { Locator, Page, expect } from "@playwright/test";
import { ProductDetails } from "./ProductListPage";

export class FullBagPage {
  readonly page: Page;
  private readonly bagIcon: Locator;
  private readonly viewFullBag: Locator;
  private readonly productName: Locator;
  private readonly productFit: Locator;
  private readonly productColourAndSize: Locator;
  private readonly priceOneProduct: Locator;
  private readonly priceTotal: Locator;
  private readonly priceSubtotal: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bagIcon = page.locator(
      "button[data-locator-id=header-miniBag-select]"
    );
    this.viewFullBag = page.getByRole("link", { name: "View full bag" });
    this.productName = page.locator('*[class^="product-card_title"]');
    this.productFit = page.locator(
      '*[class^="product-card_featured-selection"]'
    );
    this.productColourAndSize = page.locator(
      '*[class^="product-card_selected-option"]'
    );
    this.priceOneProduct = page.locator(
      '*[class^="price_price"]'
    );
    this.priceTotal = page.locator(
      'div[class^="cart-page_right"] p[data-locator-id^="bag-totalValue-read"]'
    );
    this.priceSubtotal = page.locator(
      'div[class^="cart-page_right"] div[class^="summary_summary-info-wrapper"]:not([class*="--bold"])'
    );
    this.checkoutButton = page.getByRole("link", { name: "Checkout securely" });
  }

  async clickOnBasket() {
    await this.bagIcon.click();
  }

  async clickViewFullBag() {
    await this.viewFullBag.click();
  }

  async verifyItemOnFullBagPage(productDetails: ProductDetails) {
    await this.clickOnBasket();
    await this.clickViewFullBag();
    expect(await this.checkoutButton).toBeVisible();
    expect(await this.productName.textContent()).toBe(productDetails.productName);
    expect((await this.productFit.textContent())?.toLowerCase()).toBe(productDetails.productFit);
    expect(await this.productColourAndSize.textContent()).toContain(
      productDetails.productColour
    );
    expect((await this.productColourAndSize.textContent())?.toLowerCase()).toContain(
      productDetails.productSize
    );
    expect(await this.priceOneProduct.textContent()).toBe(productDetails.productPrice)
    expect((await this.priceSubtotal.textContent())?.split("Subtotal")[1]).toBe(productDetails.productPrice)
    expect(await this.priceTotal.textContent()).toBe(productDetails.productPrice)
  }
}
