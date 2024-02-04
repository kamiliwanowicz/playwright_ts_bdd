import { CheckoutPage } from "../tests/pages/CheckoutPage";
import { HomePage } from "../tests/pages/HomePage";
import { FullBagPage } from "../tests/pages/FullBagPage";
import { ProductListPage } from "../tests/pages/ProductListPage";
import { ProductPage } from "../tests/pages/ProductPage";
import { SummaryPage } from "../tests/pages/SummaryPage";
import { test as baseTest } from "@playwright/test";

type pages = {
  checkoutPage: CheckoutPage;
  homePage: HomePage;
  fullBagPage: FullBagPage;
  productListPage: ProductListPage;
  productPage: ProductPage;
  summaryPage: SummaryPage;
};

const testPages = baseTest.extend<pages>({
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  fullBagPage: async ({ page }, use) => {
    await use(new FullBagPage(page));
  },
  productListPage: async ({ page }, use) => {
    await use(new ProductListPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  summaryPage: async ({ page }, use) => {
    await use(new SummaryPage(page));
  }
})

export const test = testPages;
export const expect = testPages.expect
