import { Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductListPage } from "../pages/ProductListPage";
import { FullBagPage } from "../pages/FullBagPage";
import { ProductPage } from "../pages/ProductPage";
import { SummaryPage } from "../pages/SummaryPage";
import { CheckoutPage } from "../pages/CheckoutPage";

export class PagesFixture {
  page: Page;
  homePage: HomePage;
  productListPage: ProductListPage;
  fullBagPage: FullBagPage;
  productPage: ProductPage;
  summaryPage: SummaryPage;
  checkoutPage: CheckoutPage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.productListPage = new ProductListPage(page);
    this.fullBagPage = new FullBagPage(page);
    this.productPage = new ProductPage(page);
    this.summaryPage = new SummaryPage(page);
    this.checkoutPage = new CheckoutPage(page);
  }
}
