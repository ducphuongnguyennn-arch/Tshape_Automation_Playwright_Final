import { test, expect } from '../fixture/ui';

test.describe('Register Student', () => {
    test.beforeEach(async ({ registerForm, page }) => {
        await registerForm.navigateToRegisterPage();
        await expect(page).toHaveURL(/automation-practice-form/);
    });

    test('submit form with mandatory fields only', async ({ registerForm }) => {
        await registerForm.fillForm({
            firstName: 'John',
            lastName: 'Doe',
            gender: 'Male',
            phone: '0123456789',
        });
        await registerForm.clickSubmitForm();
        await registerForm.assertModalTitle('Thanks for submitting the form');
        await expect(registerForm.getModalValue('Student Name')).toHaveText('John Doe');
        await expect(registerForm.getModalValue('Gender')).toHaveText('Male');
        await expect(registerForm.getModalValue('Mobile')).toHaveText('0123456789');
    });

    test('submit form with all fields', async ({ registerForm }) => {
        await registerForm.fillForm({
            firstName: 'John',
            lastName: 'Doe',
            gender: 'Male',
            phone: '0123456789',
            subject: 'Maths',
            email: 'john@test.com',
            hobby: 'Sports',
            address: '123 Main Street',
            state: 'NCR',
            city: 'Delhi',
        });
        await registerForm.clickSubmitForm();
        await registerForm.assertModalTitle('Thanks for submitting the form');
        await expect(registerForm.getModalValue('Student Name')).toHaveText('John Doe');
        await expect(registerForm.getModalValue('Student Email')).toHaveText('john@test.com');
        await expect(registerForm.getModalValue('Gender')).toHaveText('Male');
        await expect(registerForm.getModalValue('Mobile')).toHaveText('0123456789');
        await expect(registerForm.getModalValue('Subjects')).toHaveText('Maths');
        await expect(registerForm.getModalValue('Hobbies')).toHaveText('Sports');
        await expect(registerForm.getModalValue('Address')).toHaveText('123 Main Street');
        await expect(registerForm.getModalValue('State and City')).toHaveText('NCR Delhi');
    });
});

