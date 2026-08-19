import { Page, Locator } from '@playwright/test';
import { BasePage } from '../core/page/BasePage';
import { step } from 'allure-js-commons';
import { expect } from '@playwright/test';

export class HomePage extends BasePage {
    readonly CartButton: Locator;
    readonly CartQuantity: Locator;

    constructor(page: Page) {
        super(page);
        this.CartButton = page.locator('//button[@class = "cart-btn"]');
        this.CartQuantity = page.locator('//button[@class = "cart-btn"]//span');
    }

    DynamicThemVaoGioButton(productName: string): Locator {
        return this.page.locator(`//h3[.="${productName}"]/..//button`);
    }

    DynamicProductPrice(productName: string): Locator {
        return this.page.locator(`//h3[.="${productName}"]/following-sibling::p[@class="product-price"]`);
    }

    DynamicProductNameElement(productName: string): Locator {
        return this.page.locator(`//h3[.="${productName}"]`);
    }
    async navigateToLoginPage() {
        await this.navigateTo('/home');
    }

    async addProductToCart(productName: string) {
        await step(`Click "Thêm vào giỏ" button for "${productName}"`, async () => {
            await this.click(this.DynamicThemVaoGioButton(productName));
        });
    }

    async getProductPrice(productName: string): Promise<string> {
        return this.getText(this.DynamicProductPrice(productName));
    }

    async getProductName(productName: string): Promise<string> {
        return this.getText(this.DynamicProductNameElement(productName));
    }

    async VerifyProductInCart(Quantity: string) {
        await step('Verify product in cart', async () => {
            const cartQuantity = await this.getText(this.CartQuantity);
            await expect(cartQuantity).toBe(Quantity);
        });
    }

    async ClickCartButton() {
        await step('Click "Giỏ hàng" button', async () => {
            await this.click(this.CartButton);
        });
    }
}
