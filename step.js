




await page.locator('#newUserForm').getByRole('textbox', { name: 'Имя' }).click();
await page.locator('#newUserForm').getByRole('textbox', { name: 'Фамилия' }).click();
await page.getByRole('textbox', { name: 'Подтвердите пароль' }).click();
await page.getByText('Добавление нового пользователя Активный пользователь Проверяющий Менеджер задач ').click();
await page.getByRole('textbox', { name: 'Подтвердите пароль' }).selectOption('string:COMPANY');
await page.locator('select[name="level"]').selectOption('string:REGION');
await page.locator('select[name="level"]').selectOption('string:SHOP');