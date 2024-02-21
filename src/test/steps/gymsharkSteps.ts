import { Given, When, Then } from "@cucumber/cucumber";
import {
  pagesFixture,
} from "../../hooks/hooks";

Given("I go to {string} New Releases", async function (type: string) {
  await pagesFixture.homePage.goToNewReleases(type);
});

Given("I select a random item", async function () {
  this.randomItemDetails = await pagesFixture.productListPage.selectRandomItem();
  console.log(`randomItemDetails: ${Object.values(this.randomItemDetails)}`);
});

Given("I verify details on Product page", async function () {
  await pagesFixture.productPage.verifyDetailsOnProductPage(this.randomItemDetails);
});

Given("I select a random size", async function () {
  this.randomItemDetails = await pagesFixture.productPage.selectRandomSizeIfAvailable(this.randomItemDetails);
});

When("I add the item to the basket", async function () {
  await pagesFixture.productPage.addItemToBasket();
});

Then("I verify item has been added successfully to Summary page", async function () {
  await pagesFixture.summaryPage.verifyItemOnSummaryPage(this.randomItemDetails);
});

Then("I close the summary", async function () {
  await pagesFixture.summaryPage.closeSummary();
});

Then("I expect the basket icon to display number {string}", async function (s: string) {
  await pagesFixture.productPage.basektIconDisplaysNumberOfItems("1");
});

Then("I verify values on Full Bag page", async function () {
  await pagesFixture.fullBagPage.verifyItemOnFullBagPage(this.randomItemDetails);
});

Then("I verify values on Checkout page", async function () {
  await pagesFixture.checkoutPage.verifyItemOnCheckoutPage(this.randomItemDetails);
});
