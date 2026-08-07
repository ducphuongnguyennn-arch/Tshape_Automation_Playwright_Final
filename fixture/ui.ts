import { test as apiTest } from './api';
import { RegisterForm } from '../pages/RegisterForm';
import { SearchBook } from '../pages/SearchBook';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';

type UIFixtures = {
  registerForm: RegisterForm;
  searchBook: SearchBook;
  loginPage: LoginPage;
  profilePage: ProfilePage;
};

export const test = apiTest.extend<UIFixtures>({
  registerForm: async ({ page }, use) => {
    await use(new RegisterForm(page));
  },
  searchBook: async ({ page }, use) => {
    await use(new SearchBook(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
});

export { expect } from '@playwright/test';
