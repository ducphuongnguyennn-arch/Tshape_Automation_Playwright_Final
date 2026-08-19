import { Page, Locator } from '@playwright/test';
import { BasePage } from '../core/page/BasePage';
import { step } from 'allure-js-commons';

export class CartDetailPage extends BasePage {
    readonly CheckoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.CheckoutButton = page.locator('button.checkout-btn');
    }


    DynamicCartItemTotal(productName: string): Locator {
        return this.page.locator(`//h3[.='${productName}']/ancestor::div[@class='cart-item']//div[@class='item-total']`);
    }
    DynamicCartQuantity(productName: string): Locator {
        return this.page.locator(`//h3[.='${productName}']/ancestor::div[@class='cart-item']//span[@class='qty-value']`);
    }
    DynamicCartUnitPrice(productName: string): Locator {
        return this.page.locator(`//h3[.='${productName}']/following-sibling::p[@class='item-unit-price']`);
    }

    DynamicCartProductName(productName: string): Locator {
        return this.page.locator(`//h3[.='${productName}']`);
    }

    async getItemTotal(productName: string): Promise<string> {
        return this.getText(this.DynamicCartItemTotal(productName));
    }

    async getItemQuantity(productName: string): Promise<string> {
        return this.getText(this.DynamicCartQuantity(productName));
    }

    async getItemUnitPrice(productName: string): Promise<string> {
        return this.getText(this.DynamicCartUnitPrice(productName));
    }

    async getProductName(productName: string): Promise<string> {
        return this.getText(this.DynamicCartProductName(productName));
    }

    async clickCheckoutNow() {
        await step('Click "Thanh toán ngay" button', async () => {
            await this.click(this.CheckoutButton);
        });
    }
}
