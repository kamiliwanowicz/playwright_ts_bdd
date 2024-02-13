import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { ProductListPage } from "../../pages/ProductListPage";
import { FullBagPage } from "../../pages/FullBagPage";
import { ProductPage } from "../../pages/ProductPage";
import { SummaryPage } from "../../pages/SummaryPage";
import { CheckoutPage } from "../../pages/CheckoutPage";

let browser: Browser;
let page: Page;
let context: BrowserContext;
let homePage: HomePage;
let productListPage: ProductListPage;
let fullBagPage: FullBagPage;
let productPage: ProductPage;
let summaryPage: SummaryPage;
let checkoutPage: CheckoutPage;

var { setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(60 * 1000);

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});

Before(async function () {
  context = await browser.newContext({
    recordVideo: {
      dir: "test-result/videos/",
    },
  });
  await context.tracing.start({ screenshots: true, snapshots: true });
  page = await context.newPage();

  homePage = new HomePage(page);
  productListPage = new ProductListPage(page);
  fullBagPage = new FullBagPage(page);
  productPage = new ProductPage(page);
  summaryPage = new SummaryPage(page);
  checkoutPage = new CheckoutPage(page);

  // // @ts-ignore
  // pageFixture.page = page;
});

After(async function (scenario) {
  const scenarioName = scenario.pickle.name;
  const id = scenario.pickle.id;
  await context.tracing.stop({
    path: `test-result/cucumber-trace/${scenarioName}.zip`,
  });

  await page.close();
  await page.video()?.saveAs(`test-result/videos/${scenarioName}.webm`);
  await page.video()?.delete();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});

export { page, homePage, productListPage, fullBagPage, productPage, summaryPage, checkoutPage };
