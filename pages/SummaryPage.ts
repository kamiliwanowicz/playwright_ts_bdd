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
    this.productFit = page.locator('*[class^="product-card_featured-selection"]');
    this.productColourAndSize = page.locator('*[class^="product-card_selected-option"]');
    this.priceOneProduct = page.locator('*[class^="price_price"]');
    this.priceSubtotal = page.locator('div[class^="summary_summary-info-wrapper"]:not([class*="--bold"])');
    this.priceTotal = page.locator('p[data-locator-id^="miniBag-totalValue-read"]');
    this.checkoutButton = page.getByRole("link", { name: "Checkout securely " });
    this.closeRegionSelectionX = page.locator("button[data-locator-id=storeSelector-close-select]");
    this.closeYourBagSummaryX = page.locator("button[data-locator-id=miniBag-closeButton-select]");
  }

  async verifyItemOnSummaryPage(productDetails: ProductDetails) {
    await expect(this.checkoutButton).toBeVisible();
    await this.verifyProductName(productDetails.productName);
    await this.verifyProductFit(productDetails.productFit);
    await this.verifyProductColour(productDetails.productColour);
    await this.verifyProductSize(productDetails.productSize);
    await this.verifyProductPrice(productDetails.productPrice);
  }

  async closeSummary() {
    await this.closeRegionSelectionX.click();
    await this.closeYourBagSummaryX.click();
  }

  private async verifyProductName(productName: string | null) {
    expect(await this.productName.textContent()).toContain(productName);
  }

  private async verifyProductFit(productFit: string | null) {
    if (productFit != "") {
      expect((await this.productFit.textContent())?.toLowerCase()).toBe(productFit);
    }
  }

  private async verifyProductColour(productColour: string | null) {
    expect(await this.productColourAndSize.textContent()).toContain(productColour);
  }

  private async verifyProductSize(productSize: string | null | undefined) {
    if (productSize != "") {
      expect((await this.productColourAndSize.textContent())?.toLowerCase()).toContain(productSize);
    }
  }

  private async verifyProductPrice(productPrice: string | null) {
    expect(await this.priceOneProduct.textContent()).toBe(productPrice);
    expect(await this.priceTotal.textContent()).toBe(productPrice);
    expect((await this.priceSubtotal.textContent())?.split("Subtotal")[1]).toBe(productPrice);
  }
}