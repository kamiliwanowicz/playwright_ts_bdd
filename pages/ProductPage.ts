import { Locator, Page, expect } from "@playwright/test";
import { BaseQueries, lastIndex } from "../utils/baseQueries";
import { ProductDetails } from "./ProductListPage";

export class ProductPage {
  constructor(private page: Page) {}
  productName = this.page.locator('*[class^="product-information_title"]');
  productFit = this.page.locator('*[class^="product-information_fit"]');
  productColourOld = this.page.locator('*[class^="product-information_title"] span');
  productColour = this.page.locator('*[class^="variants_colour"]');
  productColourString = '*[class^="variants_colour"]';
  productPrice = this.page.locator('*[class^="product-information_price"]');
  sizesString = '*[class^="add-to-cart_sizes"] button:not([class*="--out-of-stock"])';
  addToBag = this.page.locator("button[data-locator-id=pdp-addToBag-submit]");
  cartCount = this.page.locator("#cart-count");
  availableSizesList = this.page.locator(
    '*[class^="add-to-cart_sizes"] button:not([class*="--out-of-stock"])'
  );
  chatIcon = this.page.locator(".intercom-lightweight-app-launcher.intercom-launcher");
  discountPercentage = this.page.locator("div[data-locator-id=pdp-productTag-sale-read]");
  discountedPrice = this.page.locator("div[data-locator-id=pdp-compareAtValue-read]");
  allSizes = this.page.locator("div[class^=add-to-cart_sizes]");
  needHelpPopup = this.page.getByText("Need help?");

  async verifyDetailsOnProductPage(productDetails: ProductDetails[]) {
    let product = productDetails[lastIndex(productDetails)];
    await this.verifyProductName(product.productName);
    await this.verifyProductColour(product.productColour);
    await this.verifyProductFit(product.productFit);
    await this.verifyProductPrice(product.productPrice);
  }

  async getAvailableSizes() {
    const baseQueries = new BaseQueries(this.page);
    const sizePresent = await baseQueries.checkIfElementPresent(this.sizesString);
    if (!sizePresent) {
      return null;
    }
    const sizes = await this.availableSizesList.allTextContents();
    return sizes;
  }

  async selectRandomSizeIfAvailable(productDetails: ProductDetails[]): Promise<ProductDetails> {
    let product = productDetails[lastIndex(productDetails)];
    const productPage = new ProductPage(this.page);
    const sizes = await productPage.getAvailableSizes();
    if (sizes === null) {
      product.productSize = "";
      return product;
    }
    const randomNumber = Math.floor(Math.random() * (sizes.length - 1));
    const randomSize = sizes[randomNumber];
    await this.page
      .locator(`div[class^="add-to-cart_sizes"] button[data-locator-id="pdp-size-${randomSize}-select"]`)
      .click();
    product.productSize = randomSize;
    return product;
  }

  async addItemToBasket() {
    await this.addToBag.click();
  }

  async basektIconDisplaysNumberOfItems(numOfItems: string) {
    expect(await this.cartCount).toHaveText(numOfItems);
  }

  private async verifyProductColour(productColour: string | null) {
    const baseQueries = new BaseQueries(this.page);
    if (await baseQueries.checkIfElementPresent(this.productColourString)) {
      expect(await this.productColour.textContent()).toContain(productColour);
    } else {
      expect(await this.productColourOld.textContent()).toContain(productColour);
    }
  }

  private async verifyProductName(productName: string | null) {
    expect(await this.productName.textContent()).toContain(productName);
  }

  private async verifyProductFit(productFit: string | null) {
    if (productFit != "") {
      expect(await this.productFit.textContent()).toContain(productFit);
    }
  }

  private async verifyProductPrice(productPrice: string | null) {
    expect(await this.productPrice.textContent()).toContain(productPrice);
  }
}
