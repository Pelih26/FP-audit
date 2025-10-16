import { fakerRU as faker, th } from '@faker-js/faker';

// Методы заполнения создаваемых данных в импуты
export class GenerateData {
  addText() {
    this.text_input = faker.lorem.text();
    return this;
  }

  addEmail() {
    this.email = faker.internet.email({ provider: 'AQA.ru' });
    return this;
  }

  addFirstName() {
    this.firstName = faker.person.firstName();
    return this;
  }

  addlastName() {
    this.lastName = faker.person.lastName();
    return this;
  }

  addfullPassword() {
    this.fullPassword = faker.internet.password();
    return this;
  }

  // Генерация данных для заполнения
  generate() {
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
