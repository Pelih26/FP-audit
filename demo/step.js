

await page.locator('div').filter({ hasText: /^Исполнители$/ }).click();

await page.getByRole('textbox', { name: 'Введите список номеров, разделённый запятыми или пробелами' }).click();
await page.getByRole('textbox', { name: 'Введите список номеров, разделённый запятыми или пробелами' }).fill('3015');
await page.getByRole('button', { name: 'Обработать' }).click();
await page.getByRole('button', { name: 'Добавить исполнителей (1)' }).click();
await page.getByRole('button', { name: 'Создать' }).click();
await expect(page.locator('#smallbox1')).toBeVisible();
await page.getByText('Задача будет создана в течение 15 минут').click();