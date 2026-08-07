import { test as base } from '@playwright/test';
import { AccountHelper } from '../apis/AccountHelper';
import { BookHelper } from '../apis/BookHelper';

type APIFixtures = {
  accountHelper: AccountHelper;
  bookHelper: BookHelper;
};

export { expect } from '@playwright/test';

export const test = base.extend<APIFixtures>({
  accountHelper: async ({ request }, use) => {
    const accountHelper = new AccountHelper(request);
    await use(accountHelper);
  },

  bookHelper: async ({ request }, use) => {
    const bookHelper = new BookHelper(request);
    await use(bookHelper);
  },
});
