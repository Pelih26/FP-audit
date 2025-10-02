// ОБЯЗАТЕЛЬНО ПОТРЕНЕРУЙ ЛОКАТОРЫ

// Конструкция поиска по роли.
await page.getByRole('button', { name: 'Войти' }).click();

// конструкция поиска по class (начале теста указываем -- .)
await page.locator('.fa.fa-arrow-circle-left').click();

// конструкция поиска по id он уникален (в начале теста указываем -- #)
await page.locator('#username').fill('admin');
await page.locator('#password').click();

// конструкция поиска по аттрибуту начинаеться []
await page.locator('[ng-model="search.string"]');

// todo выяснить про css селекторы
page.locator('.className');
page.locator('#id');
page.locator('div > span');

// Testsiute ->
test.describe('Авторизация', () => {});

/*
test.only('test partition template', async ({ page }) => {
  // await page.goto('https://audit-dev9.fix-price.ru/#/plannedChecklist');

  function getSalary(name) {
    console.log(name, 'Получите вашу ЗП');
    const salary = 'Много денег';
    return salary;
  }

  console.log(getSalary('Kirill'));

  // Разберись с этой функцией, пойми как ее писать
  let getSalaryOld = () => {};
});
*/
