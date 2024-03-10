import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium, firefox, webkit, devices } from "@playwright/test";
import { browserType, headlessSetting } from "../TestConfig";
import { PagesFixture } from "../../fixtures/PagesFixture";
import LoggerService from "../../utils/Logger";

let browser: Browser;
let page: Page;
let context: BrowserContext;
let pagesFixture: PagesFixture;
let device: any;

var { setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(60 * 1000);

BeforeAll(async function () {
  LoggerService.logInfo(`Running om browser: ${browserType}`);
  if (browserType === "chromium") {
    browser = await chromium.launch({ headless: headlessSetting });
  } else if (browserType === "Pixel 5" || browserType === "iPhone 12") {
    browser = await chromium.launch({ headless: headlessSetting });
    device = devices[browserType];
  } else if (browserType === "firefox") {
    browser = await firefox.launch({ headless: headlessSetting });
  } else if (browserType === "webkit") {
    browser = await webkit.launch({ headless: headlessSetting });
  } else if (browserType === "msedge") {
    browser = await chromium.launch({ headless: headlessSetting, channel: "msedge" });
  } else if (browserType === "chrome") {
    browser = await chromium.launch({ headless: headlessSetting, channel: "chrome" });
  } else {
    throw new Error(
      `Wrong browserType provided: ${browserType}. Use one of the following names: chromium, firefox, webkit, chrome, msedge, Pixel 6, iPhone 12`
    );
  }
});

Before(async function () {
  context = await browser.newContext({
    ...device,
    recordVideo: {
      dir: "test-results/video/",
    },
  });
  await context.tracing.start({ screenshots: true, snapshots: true });
  page = await context.newPage();
  pagesFixture = new PagesFixture(page);
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
    path: `test-results/html_report/screenshots/${scenarioName}.png`,
    type: "png",
  });
  return image;
}

async function saveTraceReport(scenarioName: string) {
  await context.tracing.stop({
    path: `test-results/trace/${scenarioName}.zip`,
  });
}

async function saveVideo(scenarioName: string) {
  await page.close();
  await page.video()?.saveAs(`test-results/video/${scenarioName}.webm`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await page.video()?.delete();
}

export { page, pagesFixture };
