import { test, expect } from '../../fixture/ui';
import { step } from 'allure-js-commons';
import { userData } from '../../TestData/user_data';
import { ReportUtils } from '../../core/utils/report-utils';
import productData from '../../TestData/product_data.json';
import checkoutData from '../../TestData/checkout_data.json';

test.describe('Checkout Succeeds with Valid Receiver Information', () => {
  const { username, password } = userData;
  const { productName } = productData[0];

  test.beforeEach(async ({ loginPage, homePage, cartDetailPage, page }) => {
    await step('Login as test user', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.login(username, password);
      await expect(page).toHaveURL(/home/);
    });

    await step('Add the product to cart', async () => {
      await ReportUtils.attachScreenshot('Added product to cart', page, async () => {
        await homePage.addProductToCart(productName);
      });
    });

    await step('Click on the cart button', async () => {
      await ReportUtils.attachScreenshot('Click on the cart button', page, async () => {
        await homePage.ClickCartButton();
        await expect(page).toHaveURL(/cart/);
      });
    });
  });

  for (const { caseName, receiverName, receiverPhone, receiverAddress } of checkoutData) {
    test(`Checkout succeeds with ${caseName}`, async ({ cartDetailPage, checkoutPage,page }) => {
      await step('Go to checkout page', async () => {
        await cartDetailPage.clickCheckoutNow();
        await expect(page).toHaveURL(/checkout/);
      });

      await step('Fill in receiver information and place the order', async () => {
        await ReportUtils.attachScreenshot('Place order', page, async () => {
          await checkoutPage.fillReceiverInfo(receiverName, receiverPhone, receiverAddress);
          await checkoutPage.placeOrder();
        });
      });

      await step('Verify the order is placed successfully', async () => {
        await expect(await checkoutPage.GetSuccessMessge()).toEqual('Đặt hàng thành công!');
        const RecipientName = await checkoutPage.getRecipientName();
        const DeliveryAddress = await checkoutPage.getDeliveryAddress();
        expect(RecipientName).toBe(receiverName);
        expect(DeliveryAddress).toBe(receiverAddress);
      });
    });
  }
});
