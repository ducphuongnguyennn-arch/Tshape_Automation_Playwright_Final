import { test, expect } from '../fixture/ui';
import { step } from 'allure-js-commons';
import { userData } from '../TestData/user_data';
import { bookData } from '../TestData/book_data';
import { ReportUtils } from '../core/utils/report-utils';

test.describe('Delete Book', () => {
  const { username, password, userId } = userData;
  const { isbn } = bookData;

  test.beforeEach(async ({ accountHelper, bookHelper, loginPage, page }) => {
    await step('Generate auth token and reset book data', async () => {
      const token = await accountHelper.generateToken(username, password);
      await bookHelper.deleteAllBooksSafely(userId, token);
      await bookHelper.addBook(userId, isbn, token);
    });

    await step('Login as test user', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.login(username, password);
      await expect(page).toHaveURL(/profile/);
    });
  });

  test('Delete book successfully', async ({ profilePage, page }) => {
    await step('Delete the book "Git Pocket Guide"', async () => {
      await profilePage.DeleteBookSuccessfully('Git Pocket Guide');
    });

    await step('Verify book is no longer displayed', async () => {
      await ReportUtils.attachScreenshot('After Deleting Book', page, async () => {
        await profilePage.verifyBookNotDisplayed('Git Pocket Guide');
      });
    });
  });
});
