import { Page, Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';
import { BasePage } from '../core/page/BasePage';

export class ProfilePage extends BasePage {
  readonly searchBox: Locator;
  readonly bookName: Locator;
  readonly deleteIcon: Locator;
  readonly deletePopUpOk: Locator;
  readonly deletePopUpCancel: Locator;

  constructor(page: Page) {
    super(page);
    this.searchBox = page.locator('#searchBox');
    this.bookName = page.locator('//div[@class = "action-buttons"]/descendant::a');
    this.deleteIcon = page.getByTitle('Delete');
    this.deletePopUpOk = page.locator('#closeSmallModal-ok');
    this.deletePopUpCancel = page.locator('#closeSmallModal-cancel');
  }
  //Action Flow
  async searchBook(bookName: string) {
    await this.fill(this.searchBox, bookName);
  }

  async clickDeleteForBook() {
    await this.click(this.deleteIcon);
  }

  async confirmDeletePopup() {
    await this.click(this.deletePopUpOk);
  }

  async cancelDeletePopup() {
    await this.click(this.deletePopUpCancel);
  }

  async verifyBookNotDisplayed(bookName: string) {
    await expect(this.bookName.filter({ hasText: bookName })).not.toBeVisible();
  }

  async verifyBookDisplayed(bookName: string) {
    await expect(this.bookName.filter({ hasText: bookName })).toBeVisible();
  }

  //Business Flow
  async DeleteBookSuccessfully(bookName: string) {
    await step(`Search for book: ${bookName}`, () => this.searchBook(bookName));
    await step('Click delete icon', () => this.clickDeleteForBook());
    await step('Click OK For delete popup', () => this.confirmDeletePopup());  }

  async DeleteBookCancel(bookName: string) {
    await step(`Search for book: ${bookName}`, () => this.searchBook(bookName));
    await step('Click delete icon', () => this.clickDeleteForBook());
    await step('Click cancel for delete popup', () => this.cancelDeletePopup());
  }

}
