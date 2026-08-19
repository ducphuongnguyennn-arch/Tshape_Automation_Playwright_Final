import { test as apiTest } from './api';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CartDetailPage } from '../pages/CartDetailPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ProfilePage } from '../pages/ProfilePage';


type UIFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  cartDetailPage: CartDetailPage;
  checkoutPage: CheckoutPage;
  profilePage: ProfilePage;
};

export const test = apiTest.extend<UIFixtures>({


  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  cartDetailPage: async ({ page }, use) => {
    await use(new CartDetailPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  }

});

export { expect } from '@playwright/test';
