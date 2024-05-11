import { Locator, Page, expect } from "@playwright/test";

export interface ProductDetails {
  productName: string | null;
  productFit: string | null;
  productColour: string | null;
  productPrice: string | null;
  productSize?: string | null;
}

export class ProductListPage {
  constructor(private page: Page) {}
  itemsList = this.page.locator('*[class^="product-grid_grid"] article');
  productTitle = this.page.locator('*[class^="product-card_product-title"] h4');
  productFit = this.page.locator('*[class^="product-card_product-fit"]');
  productColour = this.page.locator('*[class^="product-card_product-colour"]');
  productPrice = this.page.locator('*[class^="product-card_product-price"]');

  async getListofItems() {
    await expect(this.itemsList.last()).toBeVisible();
    return this.itemsList;
  }

  async getProductName(productCard: Locator) {
    return await productCard.locator(this.productTitle).textContent();
  }

  async getProductFit(productCard: Locator): Promise<string | null> {
    try {
      await expect(productCard.locator(this.productFit)).toBeVisible({
        timeout: 1000,
      });
      return await productCard.locator(this.productFit).textContent();
    } catch (error) {
      return "";
    }
  }

  async getProductColour(productCard: Locator) {
    return await productCard.locator(this.productColour).textContent();
  }

  async getProductPrice(productCard: Locator) {
    return await productCard.locator(this.productPrice).textContent();
  }

  async clickOnProduct(productCard: Locator) {
    await productCard.click();
  }

  async selectRandomItem(): Promise<ProductDetails> {
    const items = await this.getListofItems();
    const len = await items.count();
    const randomNumber = Math.floor(Math.random() * (len - 1));
    const productCard: Locator = items.nth(randomNumber);
    await productCard.scrollIntoViewIfNeeded();
    const productName = await this.getProductName(productCard);
    const productFit = await this.getProductFit(productCard);
    const productColour = await this.getProductColour(productCard);
    const productPrice = await this.getProductPrice(productCard);
    await this.clickOnProduct(productCard);

    const productDetails: ProductDetails = {
      productName: productName,
      productFit: productFit,
      productColour: productColour,
      productPrice: productPrice,
    };
    return productDetails;
  }
}
