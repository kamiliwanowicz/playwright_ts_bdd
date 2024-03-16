import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";

test.describe("@productVisual", () => {
  test("Mens Hoodie product page @mensHoodieVisual", async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    await page.goto(
      "https://www.gymshark.com/products/gymshark-crest-oversized-zip-up-hoodie-charcoal-grey-marl-aw23"
    );
    await homePage.clickAcceptCookies();
    await expect(page).toHaveScreenshot({
      animations: "disabled",
      mask: [
        productPage.chatIcon,
        productPage.discountPercentage,
        productPage.discountedPrice,
        productPage.allSizes,
        productPage.needHelpPopup,
      ],
    });
  });

  test("Womens Tracktop product page @womenTracktopVisual", async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    await page.goto("https://www.gymshark.com/products/gymshark-elevate-tracktop-black-ss24");
    await homePage.clickAcceptCookies();
    await expect(page).toHaveScreenshot({
      animations: "disabled",
      mask: [
        productPage.chatIcon,
        productPage.discountPercentage,
        productPage.discountedPrice,
        productPage.allSizes,
        productPage.needHelpPopup,
      ],
    });
  });

  test("Accessories Crew Socks product page @accessoriesCrewSocksVisual", async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    await page.goto(
      "https://www.gymshark.com/products/gymshark-crew-socks-3pk-white-light-grey-core-marl-black-ss23"
    );
    await homePage.clickAcceptCookies();
    await expect(page).toHaveScreenshot({
      animations: "disabled",
      mask: [
        productPage.chatIcon,
        productPage.discountPercentage,
        productPage.discountedPrice,
        productPage.allSizes,
        productPage.needHelpPopup,
      ],
    });
  });
});
