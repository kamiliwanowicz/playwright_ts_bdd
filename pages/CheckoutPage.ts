import { Locator, Page, expect } from "@playwright/test";
import { ProductDetails } from "./ProductListPage";

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
    this.checkoutButton = page.getByRole('link', { name: 'Checkout securely ' })
    this.discountInput = page.getByPlaceholder('Discount code or gift card')
    this.productNameAndColour = page.locator('*[class^="product__description__name order-summary"]');
    this.productFit = page.locator('.product__description > :nth-child(3)');
    this.productSize = page.locator('.product__description__variant');
    this.priceOneProduct = page.locator('.product__price > .order-summary__emphasis');
    this.priceTotal = page.locator('.payment-due__price');
    this.priceSubtotal = page.locator('.total-line--subtotal .total-line__price > .order-summary__emphasis');
    this.bagIcon = page.locator("button[data-locator-id=header-miniBag-select]");
  }

  async clickBasket() {
    await this.bagIcon.click();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async verifyItemOnCheckoutPage(productDetails: ProductDetails){
    await this.clickBasket();
    await this.clickCheckout();
    await expect (this.discountInput).toBeVisible()
    expect((await this.productNameAndColour.textContent())?.replace("&quot;", '"')).toContain(productDetails.productName)
    expect(await this.productNameAndColour.textContent()).toContain(productDetails.productColour)
    if (productDetails.productFit != "") {
      expect(await this.productFit.textContent()).toBe(productDetails.productFit)
    }
    if (productDetails.productSize != "") {
      expect((await this.productSize.textContent())?.toLowerCase()).toContain(productDetails.productSize)
    }
    expect(await this.priceOneProduct.textContent()).toContain(productDetails.productPrice)
    expect(await this.priceSubtotal.textContent()).toContain(productDetails.productPrice)
    expect(await this.priceTotal.textContent()).toContain(productDetails.productPrice)
  }
}
