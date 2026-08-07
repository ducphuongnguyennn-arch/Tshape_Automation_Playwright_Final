import { test, expect } from '../fixture/ui';
import { userData } from '../TestData/user_data';
import { bookData } from '../TestData/book_data';

test.describe('Delete Book', () => {
  const { username, password, userId } = userData;
  const { isbn } = bookData;

  test('Delete book successfully', async ({ page, accountHelper, bookHelper, loginPage, profilePage }) => {

    const token = await accountHelper.generateToken(username, password);
    await bookHelper.deleteAllBooksSafely(userId, token);
    await bookHelper.addBook(userId, isbn, token);


    await loginPage.navigateToLoginPage();
    await loginPage.login(username, password);
    await expect(page).toHaveURL(/profile/);
    await profilePage.DeleteBookSuccessfully('Git Pocket Guide');
  });
});
