import { fakerRU as faker } from '@faker-js/faker';

// Методы заполнения создаваемых данных в импуты
export class GenerateData {
  text_input?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  fullPassword?: string;

  addText(): this {
    this.text_input = faker.lorem.text();
    return this;
  }

  addEmail(): this {
    this.email = faker.internet.email({ provider: 'AQA.ru' });
    return this;
  }

  addFirstName(): this {
    this.firstName = faker.person.firstName();
    return this;
  }

  addlastName(): this {
    this.lastName = faker.person.lastName();
    return this;
  }

  addfullPassword(): this {
    this.fullPassword = faker.internet.password();
    return this;
  }

  // Генерация данных для заполнения
  generate(): {
    text_input?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    fullPassword?: string;
  } {
    const copied = structuredClone({
      text_input: this.text_input,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      fullPassword: this.fullPassword,
    });
    return copied;
  }
}