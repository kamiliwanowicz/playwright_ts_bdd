import { test, expect } from "../fixtures/fixtures";
import { FullBagPage } from "./pages/FullBagPage";
import { ProductListPage } from "./pages/ProductListPage";
import { ProductPage } from "./pages/ProductPage";
import { SummaryPage } from "./pages/SummaryPage";
import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/CheckoutPage";

test("Gymshark - add a random item to basket and verify item details", async ({
  homePage,
  productListPage,
  productPage,
  summaryPage,
  fullBagPage,
  checkoutPage,
}) => {
  await homePage.goToMensNewReleases();
  let randomItemDetails = await productListPage.selectRandomItem();
  await productPage.verifyDetailsOnProductPage(randomItemDetails);
  randomItemDetails = await productPage.selectRandomSizeIfAvailable(
    randomItemDetails
  );
  await productPage.addItemToBasket();
  await summaryPage.verifyItemOnSummaryPage(randomItemDetails);
  await summaryPage.closeSummary();
  await productPage.basektIconDisplaysNumberOfItems("1");
  await fullBagPage.verifyItemOnFullBagPage(randomItemDetails);
  await checkoutPage.verifyItemOnCheckoutPage(randomItemDetails);
});
