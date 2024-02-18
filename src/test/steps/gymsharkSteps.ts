import { Given, When, Then } from "@cucumber/cucumber";
import {
  homePage,
  productListPage,
  fullBagPage,
  productPage,
  summaryPage,
  checkoutPage,
} from "../../hooks/hooks";

Given("I go to {string} New Releases", async function (type: string) {
  await homePage.goToNewReleases(type);
});

Given("I select a random item", async function () {
  this.randomItemDetails = await productListPage.selectRandomItem();
  console.log(`randomItemDetails: ${Object.values(this.randomItemDetails)}`);
});

Given("I verify details on Product page", async function () {
  await productPage.verifyDetailsOnProductPage(this.randomItemDetails);
});

Given("I select a random size", async function () {
  this.randomItemDetails = await productPage.selectRandomSizeIfAvailable(this.randomItemDetails);
});

When("I add the item to the basket", async function () {
  await productPage.addItemToBasket();
});

Then("I verify item has been added successfully to Summary page", async function () {
  await summaryPage.verifyItemOnSummaryPage(this.randomItemDetails);
});

Then("I close the summary", async function () {
  await summaryPage.closeSummary();
});

Then("I expect the basket icon to display number {string}", async function (s: string) {
  await productPage.basektIconDisplaysNumberOfItems("1");
});

Then("I verify values on Full Bag page", async function () {
  await fullBagPage.verifyItemOnFullBagPage(this.randomItemDetails);
});

Then("I verify values on Checkout page", async function () {
  await checkoutPage.verifyItemOnCheckoutPage(this.randomItemDetails);
});
