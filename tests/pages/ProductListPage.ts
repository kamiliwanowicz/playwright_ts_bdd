import { Locator, Page, expect } from "@playwright/test";

interface ProductDetails {
  productName: string | null;
  productFit: string | null;
  productColour: string | null;
  productPrice: string | null;
}

export class ProductListPage {
  readonly page: Page;
  private readonly itemsList: Locator;
  private readonly productTitle: Locator;
  private readonly productFit: Locator;
  private readonly productColour: Locator;
  private readonly productPrice: Locator;
  private readonly image: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemsList = page.locator('*[class^="product-grid_grid"] article');
    this.productTitle = page.locator('*[class^="product-card_product-title"]');
    this.productFit = page.locator('*[class^="product-card_product-fit"]');
    this.productColour = page.locator(
      '*[class^="product-card_product-colour"]'
    );
    this.productPrice = page.locator('*[class^="product-card_product-price"]');
  }

  async getListofItems() {
    await expect(this.itemsList.last()).toBeVisible();
    return this.itemsList;
  }

  async getProductName(productCard: Locator) {
    return productCard.locator(this.productTitle).textContent();
  }

  async getProductFit(productCard: Locator) {
    return productCard.locator(this.productFit).textContent();
  }

  async getProductColour(productCard: Locator) {
    return productCard.locator(this.productColour).textContent();
  }

  async getProductPrice(productCard: Locator) {
    return productCard.locator(this.productPrice).textContent();
  }

  async clickOnProduct(productCard: Locator) {
    await productCard.click();

  }

  async selectRandomItem(): Promise<ProductDetails>{
    const productListPage = new ProductListPage(this.page);
    const items = await productListPage.getListofItems();
    const len = await items.count();
    const randomNumber = Math.floor(Math.random() * len);
    const productCard = items.nth(randomNumber);
    await productCard.scrollIntoViewIfNeeded();
    const productName = await productListPage.getProductName(productCard);
    const productFit = await productListPage.getProductFit(productCard);
    const productColour = await productListPage.getProductColour(productCard);
    const productPrice = await productListPage.getProductPrice(productCard);
    await productListPage.clickOnProduct(productCard);

    const productDetails: ProductDetails = {
      productName: productName,
      productFit: productFit,
      productColour: productColour,
      productPrice: productPrice,
    };
    return productDetails;
  }
}
