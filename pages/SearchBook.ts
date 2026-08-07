import { Page, Locator } from '@playwright/test';
import { BasePage } from '../core/page/BasePage';

export class SearchBook extends BasePage {
    readonly searchInput: Locator;
    // each title cell in the results table
    readonly bookTitles: Locator;

    constructor(page: Page) {
        super(page);
        this.searchInput = page.locator('#searchBox');
        this.bookTitles = page.locator("//div[@class = 'action-buttons']/descendant::a");
    }

    async navigateToBookStore(): Promise<void> {
        await this.navigateTo('/books');
    }

    async searchFor(keyword: string): Promise<void> {
        await this.fill(this.searchInput, keyword);
    }

    async getAllBookTitles(): Promise<string[]> {
        return this.bookTitles.allInnerTexts();
    }
}
