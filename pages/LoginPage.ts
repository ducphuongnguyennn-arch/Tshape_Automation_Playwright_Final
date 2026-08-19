import { Page, Locator } from '@playwright/test';
import { BasePage } from '../core/page/BasePage';

export class LoginPage extends BasePage {
  readonly TaiKhoanTextBox: Locator;
    readonly MatKhauTextBox: Locator;
    readonly DangNhapButton: Locator;

  constructor(page: Page) {
    super(page);
    this.TaiKhoanTextBox = page.locator('#username');
    this.MatKhauTextBox = page.locator('#password');
    this.DangNhapButton = page.locator('//button[@data-testid="login-submit"]');
  }

  async navigateToLoginPage() {
    await this.navigateTo('/login');
  }

  async login(username: string, password: string) {
    await this.fill(this.TaiKhoanTextBox, username);
    await this.fill(this.MatKhauTextBox, password);
    await this.click(this.DangNhapButton);
  }
}
