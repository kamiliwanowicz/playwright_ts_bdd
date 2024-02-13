import { Given, When, Then } from "@cucumber/cucumber";
import {
  homePage,
  productListPage,
  fullBagPage,
  productPage,
  summaryPage,
  checkoutPage,
} from "../../hooks/hooks";
import { ProductDetails } from "../../../pages/ProductListPage";

// var { setDefaultTimeout } = require("");
// setDefaultTimeout(60 * 1000);
let randomItemDetails: ProductDetails;
// import { pageFixture } from "../../hooks/pageFixture";

Given("I go to {string} New Releases", async function (type: string) {
  this.cucumberExample = type;
  await homePage.goToNewReleases(type);
});

Given("I select a random item", async function () {
  randomItemDetails = await productListPage.selectRandomItem();
  console.log(`randomItemDetails: ${Object.values(randomItemDetails)}`);
});

Given("I verify details on Product page", async function () {
  await productPage.verifyDetailsOnProductPage(randomItemDetails);
});

Given("I select a random size", async function () {
  randomItemDetails = await productPage.selectRandomSizeIfAvailable(randomItemDetails);
});

When("I add the item to the basket", async function () {
  await productPage.addItemToBasket();
});

Then("I verify item has been added successfully to Summary page", async function () {
  await summaryPage.verifyItemOnSummaryPage(randomItemDetails);
});

Then("I close the summary", async function () {
  await summaryPage.closeSummary();
});

Then("I expect the basket icon to display number {string}", async function (s: string) {
  await productPage.basektIconDisplaysNumberOfItems("1");
});

Then("I verify values on Full Bag page", async function () {
  await fullBagPage.verifyItemOnFullBagPage(randomItemDetails);
});

Then("I verify values on Checkout page", async function () {
  await checkoutPage.verifyItemOnCheckoutPage(randomItemDetails);
});
