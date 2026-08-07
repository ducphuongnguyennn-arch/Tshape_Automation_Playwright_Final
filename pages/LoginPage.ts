import { Page, Locator } from '@playwright/test';
import { BasePage } from '../core/page/BasePage';

export class LoginPage extends BasePage {
  readonly usernameTextbox: Locator;
  readonly passwordTextbox: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameTextbox = page.locator('#userName');
    this.passwordTextbox = page.locator('#password');
    this.loginButton = page.locator('#login');
  }

  async navigateToLoginPage() {
    await this.navigateTo('/login');
  }

  async login(username: string, password: string) {
    await this.fill(this.usernameTextbox, username);
    await this.fill(this.passwordTextbox, password);
    await this.click(this.loginButton);
  }
}
