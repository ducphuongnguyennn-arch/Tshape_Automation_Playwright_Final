import { test, expect } from '../fixture/ui';

test.describe('Search Book', () => {
    test.beforeEach(async ({ searchBook }) => {
        await searchBook.navigateToBookStore();
    });

    test('search with keyword "design" returns only matching books', async ({ searchBook }) => {
        await searchBook.searchFor('design');

        const titles = await searchBook.getAllBookTitles();

        for (const title of titles) {
            expect(title.toLowerCase()).toContain('design');
        }
    });
});
