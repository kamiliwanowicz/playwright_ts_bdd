import { Locator, Page, expect } from "@playwright/test";

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
  }

  async verifyItemOnCheckoutPage(productDetails){
    await this.checkoutButton.click()
    await expect (this.discountInput).toBeVisible()
    expect(await this.productNameAndColour.textContent()).toContain(productDetails.productName)
    expect(await this.productNameAndColour.textContent()).toContain(productDetails.productColour)
    expect((await this.productSize.textContent())?.toLowerCase()).toContain(productDetails.productSize)
    expect(await this.productFit.textContent()).toBe(productDetails.productFit)
    expect(await this.priceOneProduct.textContent()).toContain(productDetails.productPrice)
    expect(await this.priceSubtotal.textContent()).toContain(productDetails.productPrice)
    expect(await this.priceTotal.textContent()).toContain(productDetails.productPrice)
  }
}
