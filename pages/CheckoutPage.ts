import { Locator, Page, expect } from "@playwright/test";
import { ProductDetails } from "./ProductListPage";
import { lastIndex } from "../utils/BaseQueries";

export class CheckoutPage {
  readonly page: Page;
  private readonly checkoutButton: Locator;
  private readonly discountInput: Locator;
  private readonly productNameAndColour: Locator;
  private readonly productFit: Locator;
  private readonly productSize: Locator;
  private readonly priceOneProduct: Locator;
  private readonly priceTotal: Locator;
  private readonly priceSubtotal: Locator;
  private readonly bagIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByRole("link", { name: "Checkout securely" });
    this.discountInput = page.getByPlaceholder("Discount code or gift card");
    this.productNameAndColour = page.locator('*[class^="product__description__name order-summary"]');
    this.productFit = page.locator(".product__description > :nth-child(3)");
    this.productSize = page.locator(".product__description__variant");
    this.priceOneProduct = page.locator(".product__price > .order-summary__emphasis");
    this.priceTotal = page.locator(".payment-due__price");
    this.priceSubtotal = page.locator(".total-line--subtotal .total-line__price > .order-summary__emphasis");
    this.bagIcon = page.locator("button[data-locator-id=header-miniBag-select]");
  }

  async verifyItemOnCheckoutPage(productDetails: ProductDetails[]) {
    let product = productDetails[lastIndex(productDetails)]
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
