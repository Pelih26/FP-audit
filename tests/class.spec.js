import { test, expect } from '@playwright/test';
import { get } from 'http';
import { skip } from 'node:test';
// Импорт Faker с русской локалью 
import { fa, fakerRU as faker } from '@faker-js/faker'

let text_input = faker.lorem.text();
let email = faker.internet.email()
let firstName = faker.person.firstName()
let fullName = faker.person.fullName()

test('test search template', async ({ page }) => {
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
    });


test.only('Class', async ({ page }) => {

    class Animals {
    constructor(snakeName, catAge = 5) 
    {
      this.dogName = 'Бонд';
      this.catName = 'Мурка';
      this.snakeName = snakeName;
      this.catAge = catAge;
    }
        sayDog(){
            const voice = 'Гав'
            //console.log(voice)
            return voice

        }
    }

  let animal = new Animals('ИмяЗмейки');
  console.log(animal)
  console.log(animal.sayDog())
    });
