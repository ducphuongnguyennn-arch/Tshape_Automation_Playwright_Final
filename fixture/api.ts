import { test as base } from '@playwright/test';
import { AccountHelper } from '../apis/AccountHelper';
import { UpdateUser } from '../apis/UpdateUser';

type APIFixtures = {
  accountHelper: AccountHelper;
  updateUser: UpdateUser;
};

export { expect } from '@playwright/test';

export const test = base.extend<APIFixtures>({
  accountHelper: async ({ request }, use) => {
    const accountHelper = new AccountHelper(request);
    await use(accountHelper);
  },

  updateUser: async ({ request }, use) => {
    const updateUser = new UpdateUser(request);
    await use(updateUser  );
  },
});
