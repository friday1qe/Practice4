const { faker } = require('@faker-js/faker');

class Post {
    constructor() {
        // Генеруємо випадкову дату в минулому
        this.postDate = faker.date.past();  // Зберігаємо дату як об'єкт Date

        // Отримуємо лише рік, місяць і день у форматі YYYY-MM-DD
        this.formattedDate = this.postDate.toISOString().split('T')[0];

        // Генеруємо випадковий контент посту
        this.content = faker.lorem.sentence();
    }
}

class User {
    constructor(name) {
        this.name = name;
        this.ownPosts = [];  // Масив для зберігання постів користувача
    }

    addPost(post) {
        // Додаємо пост
        this.ownPosts.push(post);

        // Сортуємо пости за датою (від старих до нових)
        this.ownPosts.sort((a, b) => new Date(a.postDate) - new Date(b.postDate));
    }
}

// Створюємо користувача
const user = new User("Alice");

// Створюємо та додаємо кілька постів
user.addPost(new Post());
user.addPost(new Post());
user.addPost(new Post());

// Виводимо пости з відформатованою датою (лише рік, місяць і день)
console.log(user.ownPosts.map(post => ({ date: post.formattedDate, content: post.content })));
