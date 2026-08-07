import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../core/page/BasePage';

export class ProfilePage extends BasePage {
  readonly searchBox: Locator;
  readonly tableRows: Locator;
  readonly deleteIcon: Locator;
  readonly deletePopUpOk: Locator;
  readonly deletePopUpCancel: Locator;

  constructor(page: Page) {
    super(page);
    this.searchBox = page.locator('#searchBox');
    this.tableRows = page.locator('.rt-tr-group');
    this.deleteIcon = page.getByTitle('Delete');
    this.deletePopUpOk = page.locator('#closeSmallModal-ok');
    this.deletePopUpCancel = page.locator('#closeSmallModal-cancel');
  }
  //Action Flow
  async searchBook(bookName: string) {
    await this.fill(this.searchBox, bookName);
  }

  async clickDeleteForBook(bookName: string) {
    const row = this.tableRows.filter({ hasText: bookName });
    await this.click(this.deleteIcon);
  }

  async confirmDeletePopup() {
    await this.click(this.deletePopUpOk);
  }

  async cancelDeletePopup() {
    await this.click(this.deletePopUpCancel);
  }

  async verifyBookNotDisplayed(bookName: string) {
    await expect(this.tableRows.filter({ hasText: bookName })).not.toBeVisible();
  }

  async verifyBookDisplayed(bookName: string) {
    await expect(this.tableRows.filter({ hasText: bookName })).toBeVisible();
  }

  //Business Flow
  async DeleteBookSuccessfully(bookName: string) {
    await this.searchBook(bookName);
    await this.clickDeleteForBook(bookName);
    await this.confirmDeletePopup();
    await this.handleAlert();
    await this.verifyBookNotDisplayed(bookName);
  }

  async DeleteBookCancel(bookName: string) {
    await this.searchBook(bookName);
    await this.clickDeleteForBook(bookName);
    await this.cancelDeletePopup();
    await this.verifyBookDisplayed(bookName);
  }

}
