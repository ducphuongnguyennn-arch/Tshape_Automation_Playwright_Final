import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  workers: 3,
  reporter: [['html', { outputFolder: './reports/playwright-report' }], ["allure-playwright", { resultsDir: './reports/allure-results' }]],
  use: {
    baseURL: 'https://testing.platformforge.dev/',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
