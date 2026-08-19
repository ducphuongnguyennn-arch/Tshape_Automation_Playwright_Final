import { Page } from "@playwright/test";
import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";

export class ReportUtils {
    static async attachScreenshot(title: string, page: Page, fn: () => Promise<void>) {
        await page.waitForLoadState("networkidle");
        const beforeScreenshot = await page.screenshot();
        await allure.attachment(title, beforeScreenshot, ContentType.JPEG);
        await fn();
        await page.waitForLoadState("networkidle");
        const afterScreenshot = await page.screenshot();
        await allure.attachment(title, afterScreenshot, ContentType.JPEG);
    }
}
