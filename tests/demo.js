import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { get } from 'http';

test.only('test search template', async ({ page }) => {
  let womanProfileaArray = [1, 1.1, {}, 'string', false, 454545];
  womanProfileaArray[womanProfileaArray.length] = 'ТЫКВА'
  // womanProfileaArray[5] = 'ТЫКВА'
  // console.log(womanProfileaArray[womanProfileaArray.length - 1]);
  // console.log(womanProfileaArray.at(-1)); // Более лучший вариант
  //   console.log(womanProfileaObject.name);
  //   console.log(womanProfileaObject[1]);
  //   console.log(womanProfileaObject['name']);

  let newUser = {
    getUserEmail: faker.internet.email(),
    getUserName: faker.person.firstName('female'),
    getUserPassword: faker.internet.password(),
    'all is ok': () => {console.log('У вас все получиться!')},
    getText: () => {console.log('И у меня все получиться!')}
      };
      await page.getByRole('link').all()




  console.log(newUser.getText())
  newUser["all is ok"]();

  let exp = newUser
  console.log(newUser);
  console.log(exp)
  newUser.brokenMe = true;
  console.log(newUser)
  console.log(exp)

  // console.log(womanProfileaArray[womanProfileaArray.length - 1]);
  // console.log(womanProfileaArray.at(-1)); // Более лучший вариант
  //   console.log(womanProfileaObject.name);
  //   console.log(womanProfileaObject[1]);
  //   console.log(womanProfileaObject['name']);
});
