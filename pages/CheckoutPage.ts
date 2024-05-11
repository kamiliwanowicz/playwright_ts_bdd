import { Locator, Page, expect } from "@playwright/test";
import { ProductDetails } from "./ProductListPage";
import { lastIndex } from "../utils/baseQueries";

export class CheckoutPage {
  constructor(private page: Page) {}
  checkoutButton = this.page.getByRole("link", { name: "Checkout securely" });
  discountInput = this.page.getByPlaceholder("Discount code or gift card");
  productNameAndColour = this.page.locator('*[class^="product__description__name order-summary"]');
  productFit = this.page.locator(".product__description > :nth-child(3)");
  productSize = this.page.locator(".product__description__variant");
  priceOneProduct = this.page.locator(".product__price > .order-summary__emphasis");
  priceTotal = this.page.locator(".payment-due__price");
  priceSubtotal = this.page.locator(".total-line--subtotal .total-line__price > .order-summary__emphasis");
  bagIcon = this.page.locator("button[data-locator-id=header-miniBag-select]");

  async verifyItemOnCheckoutPage(productDetails: ProductDetails[]) {
    let product = productDetails[lastIndex(productDetails)];
    await this.clickBasket();
    await this.clickCheckout();
    await expect(this.discountInput).toBeVisible();
    await this.verifyProductName(product.productName);
    await this.verifyProductColour(product.productColour);
    await this.verifyProductFit(product.productFit);
    await this.verifyProductSize(product.productSize);
    await this.verifyProductPrice(product.productPrice);
  }

  private async verifyProductName(productName: string | null) {
    expect((await this.productNameAndColour.textContent())?.replace("&quot;", '"')).toContain(productName);
  }

  private async verifyProductColour(productColour: string | null) {
    expect(await this.productNameAndColour.textContent()).toContain(productColour);
  }

  private async verifyProductFit(productFit: string | null) {
    if (productFit != "") {
      expect(await this.productFit.textContent()).toBe(productFit);
    }
  }

  private async verifyProductSize(productSize: string | null | undefined) {
    if (productSize != "") {
      expect((await this.productSize.textContent())?.toLowerCase()).toContain(productSize);
    }
  }

  private async verifyProductPrice(productPrice: string | null) {
    expect(await this.priceOneProduct.textContent()).toContain(productPrice);
    expect(await this.priceSubtotal.textContent()).toContain(productPrice);
    expect(await this.priceTotal.textContent()).toContain(productPrice);
  }

  private async clickBasket() {
    await this.bagIcon.click();
  }

  private async clickCheckout() {
    await this.checkoutButton.click();
  }
}
