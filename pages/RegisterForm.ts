import { Page, Locator } from '@playwright/test';
import { BasePage } from '../core/page/BasePage';

export class RegisterForm extends BasePage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly submitBtn: Locator;
    readonly phoneInput: Locator;
    readonly subjectInput: Locator;
    readonly currentAddressInput: Locator;
    readonly selectStateInput: Locator;
    readonly selectCityInput: Locator;
    readonly modalTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.emailInput = page.locator('#userEmail');
        this.phoneInput = page.locator('#userNumber');
        this.subjectInput = page.locator('#subjectsInput');
        this.submitBtn = page.locator('#submit');
        this.currentAddressInput = page.locator('#currentAddress');
        this.selectStateInput = page.locator('//div[text()="Select State"]/following-sibling::div');
        this.selectCityInput = page.locator('//div[text()="Select City"]/following-sibling::div');
        this.modalTitle = page.locator('#example-modal-sizes-title-lg');
    }

    // Select a radio button based on the label text
    async selectRadioByLabel(label: string): Promise<void> {
        await this.page.locator(`//label[.="${label}"]/preceding-sibling::input`).click();
    }

    //Dynamicly get the value from the modal based on the label
    getModalValue(label: string): Locator {
        return this.page.locator(`//td[.="${label}"]/following-sibling::td`);
    }

    async navigateToRegisterPage(): Promise<void> {
        await this.navigateTo('/automation-practice-form');
    }

    async clickSubmitForm(): Promise<void> {
        await this.click(this.submitBtn);
    }

    async fillForm(data: {
        firstName: string;
        lastName: string;
        gender: string;
        phone: string;
        email?: string;
        subject?: string;
        hobby?: string;
        address?: string;
        state?: string;
        city?: string;
    }): Promise<void> {
        await this.fill(this.firstNameInput, data.firstName);
        await this.fill(this.lastNameInput, data.lastName);
        await this.selectRadioByLabel(data.gender);
        await this.fill(this.phoneInput, data.phone);

        if (data.email) await this.fill(this.emailInput, data.email);
        if (data.subject) {
            await this.fill(this.subjectInput, data.subject);
            await this.page.getByText(data.subject, { exact: true }).click();
        }
        if (data.hobby) await this.selectRadioByLabel(data.hobby);
        if (data.address) await this.fill(this.currentAddressInput, data.address);
        if (data.state) {
            await this.click(this.selectStateInput);
            await this.page.getByText(data.state, { exact: true }).click();
        }
        if (data.city) {
            await this.click(this.selectCityInput);
            await this.page.getByText(data.city, { exact: true }).click();
        }
    }

    async assertModalTitle(expected: string): Promise<void> {
        await this.assertText(this.modalTitle, expected);
    }

}
