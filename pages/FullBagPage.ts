import { Locator, Page, expect } from "@playwright/test";
import { ProductDetails } from "./ProductListPage";
import { lastIndex } from "../utils/baseQueries";

export class FullBagPage {
  constructor(private page: Page) {}
  bagIcon = this.page.locator("button[data-locator-id=header-miniBag-select]");
  viewFullBag = this.page.getByRole("link", { name: "View full bag" });
  productName = this.page.locator('*[class^="product-card_title"]');
  productFit = this.page.locator('*[class^="product-card_featured-selection"]');
  productColourAndSize = this.page.locator('*[class^="product-card_selected-option"]');
  priceOneProduct = this.page.locator('*[class^="price_price"]');
  priceTotal = this.page.locator('div[class^="cart-page_right"] p[data-locator-id^="bag-totalValue-read"]');
  priceSubtotal = this.page.locator(
    'div[class^="cart-page_right"] div[class^="summary_summary-info-wrapper"]:not([class*="--bold"])'
  );
  checkoutButton = this.page.getByRole("link", { name: "Checkout securely" });

  async clickOnBasket() {
    await this.bagIcon.click();
  }

  async clickViewFullBag() {
    await this.viewFullBag.click();
  }

  async verifyItemOnFullBagPage(productDetails: ProductDetails[]) {
    let product = productDetails[lastIndex(productDetails)];
    await this.clickOnBasket();
    await this.clickViewFullBag();
    expect(await this.checkoutButton).toBeVisible();
    expect(await this.productName.textContent()).toBe(product.productName);
    expect((await this.productFit.textContent())?.toLowerCase()).toBe(product.productFit);
    expect(await this.productColourAndSize.textContent()).toContain(product.productColour);
    expect((await this.productColourAndSize.textContent())?.toLowerCase()).toContain(product.productSize);
    expect(await this.priceOneProduct.textContent()).toBe(product.productPrice);
    expect((await this.priceSubtotal.textContent())?.split("Subtotal")[1]).toBe(product.productPrice);
    expect(await this.priceTotal.textContent()).toBe(product.productPrice);
  }
}
