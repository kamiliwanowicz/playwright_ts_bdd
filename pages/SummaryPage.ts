import { Locator, Page, expect } from "@playwright/test";
import { ProductDetails } from "./ProductListPage";

export class SummaryPage {
  readonly page: Page;
  private readonly productName: Locator;
  private readonly productFit: Locator;
  private readonly productColourAndSize: Locator;
  private readonly priceOneProduct: Locator;
  private readonly priceTotal: Locator;
  private readonly priceSubtotal: Locator;
  private readonly checkoutButton: Locator;
  private readonly closeRegionSelectionX: Locator;
  private readonly closeYourBagSummaryX: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('h2[class^="product-card_title"]');
    this.productFit = page.locator(
      '*[class^="product-card_featured-selection"]'
    );
    this.productColourAndSize = page.locator(
      '*[class^="product-card_selected-option"]'
    );
    this.priceOneProduct = page.locator('*[class^="price_price"]');
    this.priceSubtotal = page.locator(
      'div[class^="summary_summary-info-wrapper"]:not([class*="--bold"])'
    );
    this.priceTotal = page.locator(
      'p[data-locator-id^="miniBag-totalValue-read"]'
    );
    this.checkoutButton = page.getByRole("link", {
      name: "Checkout securely ",
    });
    this.closeRegionSelectionX = page.locator(
      "button[data-locator-id=storeSelector-close-select]"
    );
    this.closeYourBagSummaryX = page.locator(
      "button[data-locator-id=miniBag-closeButton-select]"
    );
  }

  async verifyItemOnSummaryPage(productDetails: ProductDetails) {
    await expect(this.checkoutButton).toBeVisible();
    expect(await this.productName.textContent()).toContain(
      productDetails.productName
    );
    if (productDetails.productFit != "") {
      expect((await this.productFit.textContent())?.toLowerCase()).toBe(
        productDetails.productFit
      );
    }
    expect(await this.productColourAndSize.textContent()).toContain(
      productDetails.productColour
    );
    if (productDetails.productSize != "") {
      expect(
        (await this.productColourAndSize.textContent())?.toLowerCase()
      ).toContain(productDetails.productSize);
    }
    expect(await this.priceOneProduct.textContent()).toBe(
      productDetails.productPrice
    );
    expect(await this.priceTotal.textContent()).toBe(
      productDetails.productPrice
    );
    expect((await this.priceSubtotal.textContent())?.split("Subtotal")[1]).toBe(
      productDetails.productPrice
    );
  }

  async closeSummary() {
    await this.closeRegionSelectionX.click();
    await this.closeYourBagSummaryX.click();
  }
}
