import { Page, Locator } from '@playwright/test';
import { BasePage } from '../core/page/BasePage';
import { step } from 'allure-js-commons';

export class CheckoutPage extends BasePage {
    readonly NameInput: Locator;
    readonly PhoneInput: Locator;
    readonly AddressInput: Locator;
    readonly SubmitButton: Locator;
    readonly SuccessHeading: Locator;
    readonly OrderCode: Locator;
    readonly RecipientName: Locator;
    readonly DeliveryAddress: Locator;
    readonly TotalPrice: Locator;
    readonly ContinueShoppingButton: Locator;

    constructor(page: Page) {
        super(page);
        this.NameInput = page.getByTestId('checkout-name');
        this.PhoneInput = page.getByTestId('checkout-phone');
        this.AddressInput = page.getByTestId('checkout-address');
        this.SubmitButton = page.getByTestId('checkout-submit');
        this.SuccessHeading = page.getByTestId('checkout-success-heading');
        this.OrderCode = page.locator('//h2[@data-testid="checkout-success-heading"]/..//p[contains(text(),"Mã đơn hàng")]//strong');
        this.RecipientName = page.locator('//h2[@data-testid="checkout-success-heading"]/..//p[contains(text(),"Người nhận")]//strong');
        this.DeliveryAddress = page.locator('//h2[@data-testid="checkout-success-heading"]/..//p[3]');
        this.TotalPrice = page.locator('//h2[@data-testid="checkout-success-heading"]/..//p[@class = "success-total"]');
        this.ContinueShoppingButton = page.getByTestId('checkout-continue');
    }

    async fillReceiverInfo(name: string, phone: string, address: string) {
        await step('Fill receiver information', async () => {
            await this.fill(this.NameInput, name);
            await this.fill(this.PhoneInput, phone);
            await this.fill(this.AddressInput, address);
        });
    }

    async placeOrder() {
        await step('Click "Đặt hàng" button', async () => {
            await this.click(this.SubmitButton);
        });
    }

    async GetSuccessMessge(): Promise<string> {
        return this.getText(this.SuccessHeading);

    }

    async getOrderCode(): Promise<string> {
        return this.getText(this.OrderCode);
    }

    async getRecipientName(): Promise<string> {
        return this.getText(this.RecipientName);
    }

    async getDeliveryAddress(): Promise<string> {
        return this.getText(this.DeliveryAddress);
    }

    async getTotalPrice(): Promise<string> {
        return this.getText(this.TotalPrice);
    }
}
