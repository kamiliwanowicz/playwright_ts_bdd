import { Given, When, Then } from "@cucumber/cucumber";
import { pagesFixture } from "../../hooks/Hooks";
import LoggerService from "../../../utils/Logger";


Given("I go to {string} New Releases", async function (type: string) {
  await pagesFixture.homePage.goToNewReleases(type);
  try {
    if ((this.productList.length = 0)) {
      this.productList = [];
    }
  } catch (error) {
    this.productList = [];
  }
});

Given("I select a random item", async function () {
  const product = await pagesFixture.productListPage.selectRandomItem();
  this.productList.push(product);
  LoggerService.logInfo(`Selected product: ${Object.values(product)}`);
});

Given("I verify details on Product page", async function () {
  await pagesFixture.productPage.verifyDetailsOnProductPage(this.productList);
});

Given("I select a random size", async function () {
  this.productList[this.productList.length - 1] = await pagesFixture.productPage.selectRandomSizeIfAvailable(
    this.productList
  );
});

When("I add the item to the basket", async function () {
  await pagesFixture.productPage.addItemToBasket();
});

Then("I verify item has been added successfully to Summary page", async function () {
  await pagesFixture.summaryPage.verifyItemOnSummaryPage(this.productList);
});

Then("I expect the basket icon to display a correct number", async function () {
  let count = this.productList.length.toString();
  await pagesFixture.summaryPage.closeSummary();
  await pagesFixture.productPage.basektIconDisplaysNumberOfItems(count);
});

Then("I verify values on Full Bag page", async function () {
  await pagesFixture.fullBagPage.verifyItemOnFullBagPage(this.productList);
});

Then("I verify values on Checkout page", async function () {
  await pagesFixture.checkoutPage.verifyItemOnCheckoutPage(this.productList);
});
