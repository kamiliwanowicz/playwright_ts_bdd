import { test, expect } from '@playwright/test';
import { HomePage } from './pages/homePage';
import { ProductListPage } from './pages/ProductListPage';
import { ProductPage } from './pages/ProductPage';
import { SummaryPage } from './pages/SummaryPage';

test('Gymshark - add a random item to basket and verify', async ({ page }) => {
 const homePage = new HomePage(page)
 const productListPage = new ProductListPage(page)
 const productPage = new ProductPage(page)
 const summaryPage = new SummaryPage(page)

 await homePage.goToMensNewReleases()
 const randomItemDetails = await productListPage.selectRandomItem()
 await productPage.verifyDetailsOnProductPage(randomItemDetails); 
 const productSize = await productPage.selectRandomSizeIfAvailable()
 await productPage.addItemToBasket()

await summaryPage.verifyItemOnSummaryPage(randomItemDetails, productSize);

 console.log('ok')
});