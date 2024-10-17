// 2 таск в процесі виконання

const { faker } = require('@faker-js/faker')

const selectUserCount = 3;
let dataOfUsers = [];

class User {
    constructor(name, email, nickname, ownPosts) {
        this.name = name, // faker.person.firstName();
            this.email = email, // `${this.name.toLowerCase()}@${faker.internet.domainName()}`; // Генеруємо email на основі імені з випадковим доменом
            this.nickname = nickname // `${this.name.toLowerCase()}${Math.floor(Math.random() * 100) + 1}`; // Генеруємо нікнейм на основі імені з додаванням випадкового числа
        this.ownPosts = ownPosts;
    }
}

class Post {
    constructor(owner, likes, comments, creationDate) {
        this.owner = owner,
            this.likes = likes,
            this.comments = comments,
            this.creationDate = creationDate
    }
}



function createUser(userCount) {
    for (let i = 0; i < userCount; i++) {
        let u = new User();
        u.name = faker.person.firstName();
        u.email = `${u.name.toLowerCase()}@${faker.internet.domainName()}`;
        u.nickname = `${u.name.toLowerCase()}${Math.floor(Math.random() * 100) + 1}`;
        u.ownPosts = [];

        dataOfUsers.push(u);
    }
}
createUser(selectUserCount);

function createPost(dataOfUsers) {
    dataOfUsers.forEach(user => {
        const countOfPosts = Math.floor(Math.random() * 11);
        for (let i = 0; i < countOfPosts; i++) {
            let p = new Post;
            p.owner = user.nickname;
            p.likes = Math.floor(Math.random() * 600);
            p.comments = 'blabla';
            let postDate = `${faker.date.anytime()}`;
            p.creationDate = postDate; // .split('T')[0];
            user.ownPosts.push(p);
        }
    })
}
createPost(dataOfUsers);

console.log(dataOfUsers[0].ownPosts[0]);

console.log(Math.floor(Math.random() * 100));

// 1 В системі є користувачі
// 2 кожен користувач має ім'я , імейл та нікнейм ( @nickname) - дані описані в коді
// 3 у кожного користувача є його пости в соц мережі
// 4 кожен пост має дату створення, текст поста, кількість лайків , коментарі до посту
// 5 користувач може отримати остані 5 постів іншого користувача (вивести в консоль повну інформацію про остані 5 постів)
// 6 коистувач може поставити лайк чи написати коментар до поста іншого користувача
// 7 користувач може створити собі новий пост
// 8 користувач може видалити свій пост
// 9 Для виконання роботи використовуйте класи. структури та функції для організації коду.