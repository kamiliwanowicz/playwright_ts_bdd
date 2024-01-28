import { Locator, Page, expect } from "@playwright/test";
import { BaseQueries } from "./baseQueries";

export class SummaryPage {
  readonly page: Page;
  private readonly yourBagTitle: Locator;
  private readonly productName: Locator;
  private readonly productFit: Locator;
  private readonly productColourAndSize: Locator;
  private readonly priceOneProduct: Locator;
  private readonly priceTotal: Locator;
  private readonly priceSelectedItem: Locator;
  private readonly viewFullBag: Locator;
  private readonly checkoutButton: Locator;
  private readonly closeXIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.yourBagTitle = page.getByRole('heading', { name: 'Your bag' });
    this.productName = page.locator('*[class^="product-card_title"]');
    this.productFit = page.locator('*[class^="product-card_featured-selection"]');
    this.productColourAndSize = page.locator('*[class^="product-card_selected-option"]');
    this.priceOneProduct = page.locator('div[class^="summary_summary-info-wrapper"]:not([class*="--bold"])');
    this.priceTotal = page.locator('p[data-locator-id^="miniBag-totalValue-read"]');
    this.priceSelectedItem = page.locator('p[class^="product-card_price"]');
    this.viewFullBag = page.getByRole('link', { name: 'View full bag' });
    this.checkoutButton = page.getByRole('link', { name: 'Checkout securely ' });
    this.closeXIcon = page.locator('*[class^="product-information_title"]');
  }

  async verifyItemOnSummaryPage(product)



}
   