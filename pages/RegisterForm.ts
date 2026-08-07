import { Page, Locator } from '@playwright/test';
import { BasePage } from '../core/page/BasePage';

export class RegisterForm extends BasePage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly maleRadioBtn: Locator;
    readonly submitBtn: Locator;
    readonly phoneInput: Locator;
    readonly subjectInput: Locator;
    readonly sportsRadioBtn: Locator;
    readonly currentAddressInput: Locator;
    readonly selectStateInput: Locator;
    readonly selectCityInput: Locator;
    readonly modalTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.emailInput = page.locator('#userEmail');
        this.maleRadioBtn = page.locator('//label[.="Male"]/preceding-sibling::input');
        this.phoneInput = page.locator('#userNumber');
        this.subjectInput = page.locator('#subjectsInput');
        this.submitBtn = page.locator('#submit');
        this.sportsRadioBtn = page.locator('//label[.="Sports"]/preceding-sibling::input');
        this.currentAddressInput = page.locator('#currentAddress');
        this.selectStateInput = page.locator('//div[text()="Select State"]/following-sibling::div');
        this.selectCityInput = page.locator('//div[text()="Select City"]/following-sibling::div');
        this.modalTitle = page.locator('#example-modal-sizes-title-lg');
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
        gender: 'Male' | 'Female' | 'Other';
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
        await this.click(this.maleRadioBtn);
        await this.fill(this.phoneInput, data.phone);

        if (data.email) await this.fill(this.emailInput, data.email);
        if (data.subject) {
            await this.fill(this.subjectInput, data.subject);
            await this.page.getByText(data.subject, { exact: true }).click();
        }
        if (data.hobby) await this.click(this.sportsRadioBtn);
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

    async assertFormLoaded(): Promise<void> {
        await this.assertVisible(this.submitBtn);
    }

    async assertModalTitle(expected: string): Promise<void> {
        await this.assertText(this.modalTitle, expected);
    }

    getModalValue(label: string): Locator {
        return this.page.locator(`td:text-is("${label}") + td`);
    }
}
