import { Locator, Page, expect } from "@playwright/test";
import { ProductDetails } from "./ProductListPage";
import { BaseQueries, lastIndex } from "../utils/baseQueries";

export class SummaryPage {
  constructor(private page: Page) {}
  productName = this.page.locator('h2[class^="product-card_title"]');
  productFit = this.page.locator('*[class^="product-card_featured-selection"]');
  productColourAndSize = this.page.locator('*[class^="product-card_selected-option"]');
  priceOneProduct = this.page.locator('*[class^="price_price"]');
  priceSubtotal = this.page.locator('div[class^="summary_summary-info-wrapper"]:not([class*="--bold"])');
  priceTotal = this.page.locator('p[data-locator-id^="miniBag-totalValue-read"]');
  checkoutButton = this.page.getByRole("link", { name: "Checkout securely" });
  closeRegionSelectionX = this.page.locator("button[data-locator-id=storeSelector-close-select]");
  closeRegionSelectionXString = "button[data-locator-id=storeSelector-close-select]";
  closeYourBagSummaryX = this.page.locator("button[data-locator-id=miniBag-closeButton-select]");
  discountLabel = this.page.getByText("Discount", { exact: true });

  async verifyItemOnSummaryPage(productDetails: ProductDetails[]) {
    const product = productDetails[lastIndex(productDetails)];
    await expect(this.checkoutButton).toBeVisible();
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

  private async getPriceSubtotal() {
    if ((await this.priceSubtotal.count()) > 1) {
      return await this.priceSubtotal.nth(0).textContent();
    } else {
      return await this.priceSubtotal.textContent();
    }
  }

  private async verifyProductPrice(productPrice: string | null) {
    expect(await this.priceOneProduct.textContent()).toContain(productPrice);
    expect(await this.priceTotal.textContent()).toContain(productPrice);
    const priceTemp = await this.getPriceSubtotal();
    if (await this.discountLabel.isHidden()) {
      expect((await this.getPriceSubtotal())?.split("Subtotal")[1]).toContain(productPrice);
    }
  }
}
