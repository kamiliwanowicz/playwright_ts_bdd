import { After, Before } from "@cucumber/cucumber";
import { Browser, Page, chromium } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { ProductListPage } from "../../pages/ProductListPage";
import { FullBagPage } from "../../pages/FullBagPage";
import { ProductPage } from "../../pages/ProductPage";
import { SummaryPage } from "../../pages/SummaryPage";
import {CheckoutPage} from "../../pages/CheckoutPage";

let browser: Browser;
let page: Page;
let homePage: HomePage;
let productListPage: ProductListPage;
let fullBagPage: FullBagPage;
let productPage: ProductPage;
let summaryPage: SummaryPage;
let checkoutPage: CheckoutPage;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();

  homePage = new HomePage(page);
  productListPage = new ProductListPage(page);
  fullBagPage = new FullBagPage(page);
  productPage = new ProductPage(page);
  summaryPage = new SummaryPage(page);
  checkoutPage = new CheckoutPage(page);

  // // @ts-ignore
  // pageFixture.page = page;
});

After(async function () {
  await page.close();
  await browser.close();
});

export {
  page,
  homePage,
  productListPage,
  fullBagPage,
  productPage,
  summaryPage,
  checkoutPage
};
