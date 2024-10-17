// 2 таск в процесі виконання

const { faker } = require('@faker-js/faker')

class User {
    constructor() {
        this.name = faker.person.firstName();
        // Генеруємо email на основі імені з випадковим доменом
        this.email = `${this.name.toLowerCase()}@${faker.internet.domainName()}`;
        // Генеруємо нікнейм на основі імені з додаванням випадкового числа
        this.nickname = `${this.name.toLowerCase()}${Math.floor(Math.random() * 100) + 1}`;
    }
}

let users = [new User()];

users.push(new User());

console.log(users);