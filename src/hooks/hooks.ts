import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { ProductListPage } from "../../pages/ProductListPage";
import { FullBagPage } from "../../pages/FullBagPage";
import { ProductPage } from "../../pages/ProductPage";
import { SummaryPage } from "../../pages/SummaryPage";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { browserType, headlessSetting } from "../testConfig";

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
  if (browserType === "chromium") {
    browser = await chromium.launch({ headless: headlessSetting });
  } else if (browserType === "firefox") {
    browser = await firefox.launch({ headless: headlessSetting });
  } else if (browserType === "webkit") {
    browser = await webkit.launch({ headless: headlessSetting });
  } else {
    throw new Error(
      `Wrong browserType provided: ${browserType}. Use one of the following names: chromium, firefox, webkit.`
    );
  }
});

Before(async function () {
  context = await browser.newContext({
    recordVideo: {
      dir: "test-result/video/",
    }
  });
  await context.tracing.start({ screenshots: true, snapshots: true });
  page = await context.newPage();

  homePage = new HomePage(page);
  productListPage = new ProductListPage(page);
  fullBagPage = new FullBagPage(page);
  productPage = new ProductPage(page);
  summaryPage = new SummaryPage(page);
  checkoutPage = new CheckoutPage(page);
});

After(async function (scenario) {
  const scenarioName = scenario.pickle.name;
  if (scenario.result?.status == "FAILED") {
    const image = await takeScreenshot(scenarioName);
    await this.attach(image, "image/png");
  }
  await saveTraceReport(scenarioName);
  await saveVideo(scenarioName);
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});

async function takeScreenshot(scenarioName: string) {
  const image = await page.screenshot({
    path: `test-result/html_report/screenshots/${scenarioName}.png`,
    type: "png",
  });
  return image;
}

async function saveTraceReport(scenarioName: string) {
  await context.tracing.stop({
    path: `test-result/trace/${scenarioName}.zip`,
  });
}

async function saveVideo(scenarioName: string) {
  await page.close();
  await page.video()?.saveAs(`test-result/video/${scenarioName}.webm`);
  await page.video()?.delete();
}

export { page, homePage, productListPage, fullBagPage, productPage, summaryPage, checkoutPage };
