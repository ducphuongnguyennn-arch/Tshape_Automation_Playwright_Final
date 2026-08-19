import { Locator, Page } from '@playwright/test';
import { BasePage } from '../core/page/BasePage';

export class ProfilePage extends BasePage {

    readonly FullNameInput: Locator;

    constructor(page: Page) {
        super(page);
        this.FullNameInput = page.getByTestId('profile-name');
    }

    async navigateToProfilePage() {
        await this.navigateTo('/profile');
    }

    async updateFullName(newFullName: string) {
        await this.FullNameInput.fill(newFullName);
    }

    async getFullName(): Promise<string> {
        return this.getValue(this.FullNameInput);
    }   
}