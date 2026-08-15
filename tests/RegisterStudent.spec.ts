import { test, expect } from '../fixture/ui';
import registerData from '../TestData/register_data.json';

test.describe('Register Student', () => {
    test.beforeEach(async ({ registerForm, page }) => {
        await registerForm.navigateToRegisterPage();
        await expect(page).toHaveURL(/automation-practice-form/);
    });

    test('submit form with mandatory fields only', async ({ registerForm }) => {
        const data = registerData.mandatoryFields;
        await registerForm.fillForm(data);
        await registerForm.clickSubmitForm();
        await registerForm.assertModalTitle('Thanks for submitting the form');
        await expect(registerForm.getModalValue('Student Name')).toHaveText(`${data.firstName} ${data.lastName}`);
        await expect(registerForm.getModalValue('Gender')).toHaveText(data.gender);
        await expect(registerForm.getModalValue('Mobile')).toHaveText(data.phone);
    });

    test('submit form with all fields', async ({ registerForm }) => {
        const data = registerData.allFields;
        await registerForm.fillForm(data);
        await registerForm.clickSubmitForm();
        await registerForm.assertModalTitle('Thanks for submitting the form');
        await expect(registerForm.getModalValue('Student Name')).toHaveText(`${data.firstName} ${data.lastName}`);
        await expect(registerForm.getModalValue('Student Email')).toHaveText(data.email);
        await expect(registerForm.getModalValue('Gender')).toHaveText(data.gender);
        await expect(registerForm.getModalValue('Mobile')).toHaveText(data.phone);
        await expect(registerForm.getModalValue('Subjects')).toHaveText(data.subject);
        await expect(registerForm.getModalValue('Hobbies')).toHaveText(data.hobby);
        await expect(registerForm.getModalValue('Address')).toHaveText(data.address);
        await expect(registerForm.getModalValue('State and City')).toHaveText(`${data.state} ${data.city}`);
    });
});

