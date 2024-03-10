import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium, firefox, webkit, devices } from "@playwright/test";
import { browserType, headlessSetting } from "../TestConfig";
import { PagesFixture } from "../../fixtures/PagesFixture";
import Logger from "../../utils/Logger";

let browser: Browser;
let page: Page;
let context: BrowserContext;
let pagesFixture: PagesFixture;
let device: any;

var { setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(60 * 1000);

BeforeAll(async function () {
  Logger.info(`Running on browser: ${browserType}`);
  switch (browserType) {
    case "chromium":
      browser = await chromium.launch({ headless: headlessSetting });
      break;
    case "firefox":
      browser = await firefox.launch({ headless: headlessSetting });
      break;
    case "webkit":
      browser = await webkit.launch({ headless: headlessSetting });
      break;
    case "msedge":
      browser = await chromium.launch({ headless: headlessSetting, channel: "msedge" });
      break;
    case "chrome":
      browser = await chromium.launch({ headless: headlessSetting, channel: "chrome" });
    default:
      if (browserType.includes("Pixel") || browserType.includes("iPhone")) {
        browser = await chromium.launch({ headless: headlessSetting });
        device = devices[browserType];
      } else {
        throw new Error(
          `Wrong browserType provided: ${browserType}. Use one of the following names: chromium, firefox, webkit, chrome, msedge, Pixel <version>, iPhone <version>`
        );
      }
      break;
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
