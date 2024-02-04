import { Locator, Page, expect } from "@playwright/test";
import { BaseQueries } from "./baseQueries";
import { ProductDetails } from "./ProductListPage";


export class ProductPage {
  readonly page: Page;
  private readonly productName: Locator;
  private readonly productFit: Locator;
  private readonly productColour: Locator;
  private readonly productPrice: Locator;
  private readonly sizesString: string;
  private readonly addToBag: Locator;
  private readonly cartCount: Locator;
  private readonly availableSizesList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('*[class^="product-information_title"]');
    this.productFit = page.locator('*[class^="product-information_fit"]');
    this.productColour = page.locator('*[class^="product-information_title"] span');
    this.productPrice = page.locator('*[class^="product-information_price"]');
    this.sizesString = '*[class^="add-to-cart_sizes"] button';
    this.addToBag = page.locator("button[data-locator-id=pdp-addToBag-submit]");
    this.cartCount = page.locator("#cart-count");
    this.availableSizesList = page.locator(
'button[data-locator-id^="pdp-size-"]:not([class*="--out-of-stock"])'
    );
  }

  async verifyDetailsOnProductPage(productDetails) {
    expect(await this.productName.textContent()).toContain(productDetails.productName);
    expect(await this.productFit.textContent()).toBe(productDetails.productFit);
    expect(await this.productFit.textContent()).toContain(productDetails.productFit);
    expect(await this.productColour.textContent()).toContain(productDetails.productColour);
    expect(await this.productPrice.textContent()).toBe(productDetails.productPrice)
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
  

  async selectRandomSizeIfAvailable(productDetails: ProductDetails): Promise<ProductDetails> {
    const productPage = new ProductPage(this.page);
    const sizes = await productPage.getAvailableSizes();
    if (sizes === null) {
      return productDetails
    }
    const randomNumber = Math.floor(Math.random() * (sizes.length-1));
    const randomSize = sizes[randomNumber]
    await this.page.locator(`button[data-locator-id="pdp-size-${randomSize}-select"]`).click();
    productDetails.productSize = randomSize;
    return productDetails
  }

  async addItemToBasket() {
    await this.addToBag.click()
  }

  async basektIconDisplaysNumberOfItems(numOfItems: string) {
    expect(await this.cartCount).toHaveText(numOfItems);
  }
}
