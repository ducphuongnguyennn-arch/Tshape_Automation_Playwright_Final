import { userData } from '../../TestData/user_data';
import { test, expect } from '../../fixture/ui';
import { step } from 'allure-js-commons';
import { ReportUtils } from '../../core/utils/report-utils';


test.describe('Update Full Name and Clean Up via API', () => {

    const { username, password } = userData;

    test.beforeEach(async ({ loginPage, page }) => {
        await step('Login as test user', async () => {
            await loginPage.navigateToLoginPage();
            await loginPage.login(username, password);
            await expect(page).toHaveURL(/home/);
        });
    });

    test('Update full name and clean up via API', async ({ accountHelper, updateUser, profilePage, page }) => {
        await step('Navigate to profile page', async () => {
            await profilePage.navigateToProfilePage();
            await expect(page).toHaveURL(/profile/);
        });

        await step('Update full name', async () => {
            await ReportUtils.attachScreenshot('Update full name', page, async () => {
                await profilePage.updateFullName('phuong1234556');
            });
        });


        await step('Clean up full name via API', async () => {
            await ReportUtils.attachScreenshot('Clean up full name via API', page, async () => {
                const token = await accountHelper.generateToken(username, password);
                await updateUser.updateProfile({ name: '1', avatar: '' }, token);
                await page.reload();
                const fullName = await profilePage.getFullName();
                expect(fullName).toBe('1');

            });
        });
    });
});

