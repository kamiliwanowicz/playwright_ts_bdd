import { Locator, Page, expect } from "@playwright/test";
import { ProductDetails } from "./ProductListPage";
import { BaseQueries, lastIndex } from "../utils/BaseQueries";

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
  private readonly closeRegionSelectionXString: string;
  private readonly discountLabel: Locator

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('h2[class^="product-card_title"]');
    this.productFit = page.locator('*[class^="product-card_featured-selection"]');
    this.productColourAndSize = page.locator('*[class^="product-card_selected-option"]');
    this.priceOneProduct = page.locator('*[class^="price_price"]');
    this.priceSubtotal = page.locator('div[class^="summary_summary-info-wrapper"]:not([class*="--bold"])');
    this.priceTotal = page.locator('p[data-locator-id^="miniBag-totalValue-read"]');
    this.checkoutButton = page.getByRole("link", { name: "Checkout securely" });
    this.closeRegionSelectionX = page.locator("button[data-locator-id=storeSelector-close-select]");
    this.closeRegionSelectionXString = "button[data-locator-id=storeSelector-close-select]";
    this.closeYourBagSummaryX = page.locator("button[data-locator-id=miniBag-closeButton-select]");
    this.discountLabel = page.getByText('Discount', { exact: true });
  }

  async verifyItemOnSummaryPage(productDetails: ProductDetails[]) {
    const product = productDetails[lastIndex(productDetails)]
    expect(await this.checkoutButton).toBeVisible();
    await this.verifyProductName(product.productName);
    await this.verifyProductFit(product.productFit);
    await this.verifyProductColour(product.productColour);
    await this.verifyProductSize(product.productSize);
    await this.verifyProductPrice(product.productPrice);
  }

  async closeSummary() {
    const baseQueries = new BaseQueries(this.page);
    if (await baseQueries.checkIfElementPresent(this.closeRegionSelectionXString)) {
      await this.closeRegionSelectionX.click();
    }
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

  private async getPriceSubtotal(){
    if (await this.priceSubtotal.count() > 1) {
      return await this.priceSubtotal.nth(0).textContent();
    }
    else {
      return await this.priceSubtotal.textContent();
    }
  }

  private async verifyProductPrice(productPrice: string | null) {
    expect(await this.priceOneProduct.textContent()).toContain(productPrice);
    expect(await this.priceTotal.textContent()).toContain(productPrice);
    const priceTemp = await this.getPriceSubtotal(); 
    if(await this.discountLabel.isHidden()) {
      expect((await this.getPriceSubtotal())?.split("Subtotal")[1]).toContain(productPrice);
    }
  }
}
