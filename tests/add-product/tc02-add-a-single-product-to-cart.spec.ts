import { test, expect } from '../../fixture/ui';
import { step } from 'allure-js-commons';
import { userData } from '../../TestData/user_data';
import { ReportUtils } from '../../core/utils/report-utils';
import productData from '../../TestData/product_data.json';

test.describe('Add a Single Product to Cart', () => {
  const { username, password } = userData;

  test.beforeEach(async ({ loginPage, page }) => {
    await step('Login as test user', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.login(username, password);
      await expect(page).toHaveURL(/home/);
    });
  });

  for (const { productName } of productData) {
    test(`Add "${productName}" to cart and verify price`, async ({ homePage, cartDetailPage, page }) => {
      let HomePrice = '';
      let HomeProductName = '';

      await step('Add the product to cart', async () => {
        await ReportUtils.attachScreenshot('Added product to cart', page, async () => {
          HomePrice = await homePage.getProductPrice(productName);
          HomeProductName = await homePage.getProductName(productName);
          await homePage.addProductToCart(productName);
        });
      });

      await step('Verify product in cart', async () => {
        await homePage.VerifyProductInCart('1');
      });

      await step('Click on the cart button', async () => {
        await ReportUtils.attachScreenshot('Click on the cart button', page, async () => {
          await homePage.ClickCartButton();
          await expect(page).toHaveURL(/cart/);
        });
      });

      await step('Verify the information matches between Home and Cart', async () => {
        const CartItemTotal = await cartDetailPage.getItemTotal(productName);
        const CartItemQuantity = await cartDetailPage.getItemQuantity(productName);
        const CartItemPerUnit = await cartDetailPage.getItemUnitPrice(productName);
        const ProductName = await cartDetailPage.getProductName(productName);
        expect(CartItemQuantity).toBe('1');
        expect(CartItemTotal).toBe(HomePrice);
        expect(CartItemPerUnit).toContain(HomePrice);
        expect(ProductName).toBe(HomeProductName);
      });
    });
  }
});

